import "../../assets/css/pages/login.css";
import React from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import {useAlert} from "../../util/AlertContext.tsx";

export default function LoginForm() {
    const { showAlert } = useAlert();
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
                console.log(response);
                localStorage.setItem("token", response.data?.content?.token);
                localStorage.setItem("user", JSON.stringify(response.data?.content?.account));
                navigate("/overview");
            })
            .catch(error => {
                if (error.response.status > 400) {
                    showAlert("Username or Password is incorrect.","error");
                }

            })
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required></input>
                <button type="submit" className="login-btn">Sign In</button>
            </form>
        </div>
    )
}