import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import HomePage from "../HomePage";

const Protector = (props) => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    if(auth.user) {
        return <>
            {props.children}
        </>
    }
    else {
        window.location.href = '/';
    }
}

export default Protector;