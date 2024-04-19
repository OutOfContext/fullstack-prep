import {Navigate} from "react-router";
import {useEffect} from "react";

export default function Logout(){

    useEffect(() => {
        localStorage.clear();
    },[])

    return(
        <Navigate to="/login"/>
    )
}