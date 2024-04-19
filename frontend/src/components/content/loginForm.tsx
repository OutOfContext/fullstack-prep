import "../../assets/css/pages/login.css"
import React from "react";
import axios from "axios";
import {useNavigate} from "react-router";

export default function LoginForm() {

    const navigate = useNavigate();
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const requestData = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        axios.post("/api/login", requestData)
            .then(response => {
                console.log(response.data?.content?.token);
                localStorage.setItem("token", response.data?.content?.token);
                navigate("/overview");
            })
            .catch(error => {
                console.log("Communication between Client & Server failed.", error);
            })
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required></input>
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}