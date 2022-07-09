import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const userInitial = []
    // Get user data
    const getUser = async () => {
        // TODO : API CALL
        //API Call

        const response = await fetch(`/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('auth-token'),

            },

        });

        const json = await response.json()
        console.log(json)
        setUser(json)
    }

    const [users, setUser] = useState(userInitial)

    // Get all Notes
    const getNotes = async () => {
        // TODO : API CALL
        //API Call

        const response = await fetch(`/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('auth-token'),

            },

        });

        const json = await response.json()
        console.log(json)
        setNotes(json)
    }

    const [notes, setNotes] = useState(notesInitial)

    // Add a Note
    const addNote = async (title, description, tag) => {
        // TODO : API CALL
        //API Call

        const response = await fetch(`/api/notes/addnote/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('auth-token'),

            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json();
        console.log(json)

        console.log("Adding a new note")
        const note = {
            "_id": "62ad7a3191c9258e2b1a80578",
            "user": "629c734b407a6a10775845a723",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-06-18T07:09:37.103Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }
    // Delete a Note
    const deleteNote = async (id) => {
        //API CALL
        const response = await fetch(`/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('auth-token'),

            },
        });
        const json = response.json();
        console.log(json)
        console.log("deleting the id" + id)
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        //API Call

        const response = await fetch(`/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('auth-token'),

            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, users, getUser }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;