import React, {ChangeEvent, useState} from "react";
import axios from "axios";
import {useAlert} from "../../../util/AlertContext.tsx";

interface AddModalProps {
    title: string,
    target: object | null,
    closeCallback: (objArr: any) => void
}

export default function AddModal(modalProps: AddModalProps) {
    const { showAlert } = useAlert();
    const [targetObj, setTargetObj] = useState(modalProps.target);
    const fields = targetObj ? Object.keys(targetObj) : [];

    const capitalizeFirstLetter = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const {name, value} = event.target;
        setTargetObj({...targetObj, [name]: value});
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const requestData = {
            name: formData.get('name')
        };

        axios.post('/api/organizations/create', requestData, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            if (res.data.status === 200) {
                modalProps.closeCallback(res.data.content);
            } else {
                showAlert("Organization ["+ requestData.name + "] already exists.","error");
            }
        })
            .catch(err => {
                console.log(err);
            })

    };

    return (
        <div>
            <h2>Add New {modalProps.title}</h2>
            <form onSubmit={handleSubmit}>
                {fields
                    .filter(field => field !== 'id')
                    .filter(field => field !== 'users')
                    .map(field => (
                        <div key={field}>
                            <label style={{color: "black"}} htmlFor={field}>{capitalizeFirstLetter(field)}</label>
                            <input id={field} name={field} type="text" onChange={handleChange}/>
                        </div>
                    ))}
                <button type="submit">Add</button>
            </form>
        </div>
)
}