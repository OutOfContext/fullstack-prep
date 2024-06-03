import React from "react";
import {useNavigate} from "react-router";
import axios from "axios";
import {useAlert} from "../../util/AlertContext.tsx";

export default function  RegisterForm() {
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const requestData = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        axios.post("/api/register", requestData)
            .then(response => {
                if (response.data?.status >= 400){
                    showAlert("Account could not be registered.", "error")
                } else {
                    //console.log(response.data?.content?.account);
                    localStorage.setItem("token", response.data?.content?.token);
                    localStorage.setItem("user", JSON.stringify(response.data?.content?.account));
                    navigate("/overview");
                }
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
                <button type="submit" className="login-btn">Sign In</button>
            </form>
        </div>
    )
}