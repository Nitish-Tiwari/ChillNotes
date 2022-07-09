import UserContext from "../users/userContext";
import { useState } from "react";
const UserState = (props) => {
    const host = "http://localhost:5000"
    const userInitial = []
    // Get all Notes
    const getUser = async () => {
        // TODO : API CALL
        //API Call

        const response = await fetch(`${host}/api/auth/getuser`, {
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

    const [user, setUser] = useState(userInitial)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserState;