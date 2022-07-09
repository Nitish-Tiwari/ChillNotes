import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext.js'
import moment from "moment";
import "../css/userprofile.css"
const Users = () => {
    let history = useNavigate();
    const context = useContext(noteContext);
    const { users, getUser } = context;
    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            getUser()

        }
        else {
            history("/login");
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div className='userprofile'>
            <h1 style={{ color: "white" }}>Profile</h1>
            <hr />
            <ul> <li> <span className='fontone'>Name </span>: {users.name}</li>
                <li> <span className='fontone'>Emial</span> : {users.email}</li>
                <li>  <span className='fontone'>Joined</span> on : {moment(users.date).utc().format('YYYY-MM-DD')}</li> </ul>
        </div>
    )
}

export default Users