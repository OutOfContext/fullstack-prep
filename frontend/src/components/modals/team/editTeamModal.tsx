import React, {ChangeEvent, useState} from "react";
import {Team} from "../../../types/types.tsx";

interface EditTeamModalProps {
    target: object | null,
    targetId: number | null,
    title: string,
    orgaId: string | undefined,
    closeCallback: (team: Team) => void
}
export default function EditTeamModal(modalProps: EditTeamModalProps) {
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
        if (modalProps.targetId === null) {
            return;
        }

        const formData = new FormData(event.currentTarget);
        const requestData = {
            id: modalProps.targetId,
            name: formData.get('name')
        };

        try {
            const response = await fetch('/api/organizations/' + modalProps.orgaId + '/teams/update', {
                method: 'PUT',
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


        } catch (error) {
            console.error('There was a problem with the request:', error);
        }
    };

    if (targetObj === null){
        return (
            <div>
                <h2>Edit {modalProps.title}</h2>
                <p>Something went wrong.</p>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Edit {modalProps.title}</h2>
                <form onSubmit={handleSubmit} >
                    {fields
                        .filter(field => field !== 'id')
                        .map(field => (
                            <div key={field}>
                                <label style={{ color: "black" }} htmlFor={field}>{capitalizeFirstLetter(field)}</label>
                                <input id={field} name={field} value={targetObj[field]} type="text" onChange={handleChange}/>
                            </div>
                        ))}
                    <button type="submit">Confirm</button>
                </form>
            </div>
        );
    }
}