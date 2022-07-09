import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext.js'
import AddNote from './AddNote.js'
import Noteitem from "./Noteitem.js"
import "../css/model.css"
export const Notes = (props) => {
    let history = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setnote] = useState({ id: "", etitle: "", edesc: "", etag: "" })
    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            getNotes()

        }
        else {
            history("/login");
        }
        // eslint-disable-next-line
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({ id: currentNote._id, etitle: currentNote.title, edesc: currentNote.description, etag: currentNote.tag })

    }
    const handleClick = (e) => {
        console.log("Updating note..", note)
        editNote(note.id, note.etitle, note.edesc, note.etag)
        refclose.current.click();
        props.showAlert("Updated successfully", 'success');
    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    const ref = useRef(null)
    const refclose = useRef(null)
    return (
        <>
            <AddNote showAlert={props.showAlert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ background: "black", color: "white", borderStyle: "solid", borderRadius: "10px", borderBlockStyle: "solid", borderColor: "white" }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                                    <div id="emailHelp" className="form-text">
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edesc" name="edesc" value={note.edesc} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />

                })}
            </div>
        </>
    )
};


