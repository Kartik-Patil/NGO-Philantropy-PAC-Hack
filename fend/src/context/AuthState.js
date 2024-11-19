import AuthContext from "./AuthContext";
import { useState, useEffect } from "react";

const AuthState = (props) => {

    const [user, setUser] = useState(() => {
        // Retrieve the user data from sessionStorage if it exists
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const updateUser = (newUser) => {
        setUser(newUser);
        sessionStorage.setItem('user', JSON.stringify(newUser)); // Store user in sessionStorage
        console.log("User: ", user);
        console.log("NewUser: ", newUser);
    }

    const logOut = () => {
        setUser(null);
        sessionStorage.removeItem('user'); // Clear user from sessionStorage
        console.log("User logged out");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, updateUser, logOut }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
