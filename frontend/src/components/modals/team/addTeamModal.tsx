import React, {ChangeEvent, useState} from "react";
import {Team} from "../../../types/types.tsx";

interface AddTeamModalProps {
    title: string,
    target: object | null,
    orgaId: string | undefined,
    closeCallback: (team: Team) => void
}
export default function AddTeamModal(modalProps: AddTeamModalProps){
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
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const requestData = {
            name: formData.get('name')
        };

        try {
            const response = await fetch('/api/organizations/' + modalProps.orgaId + '/teams/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                console.log('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response from server:', data);
            modalProps.closeCallback(data.content);

        } catch (error) {
            console.error('There was a problem with the request:', error);
        }
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