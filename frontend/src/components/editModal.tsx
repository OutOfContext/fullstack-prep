import {Project} from "../types/types.tsx";
import React, {useState} from "react";

interface EditModalProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    project: Project | null
}
export default function EditModal(modalProps: EditModalProps){
    const [editedProject, setEditedProject] = useState<Project | null>(modalProps.project);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setEditedProject(prevState => {
            if (prevState === null) {
                return null;
            }
            return ({
                ...prevState,
                [name]: value,
            });
        });
    };

    if (editedProject === null){
        return (
            <div>
                <h2>Edit Project</h2>
                <p>Something went wrong.</p>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Edit Project</h2>
                <form onSubmit={modalProps.handleSubmit} >
                    <label htmlFor="author">Author:</label>
                    <input type="text" id="author" name="author" value={editedProject.author} onChange={handleChange} required/>
                    <label htmlFor="path">URL:</label>
                    <input type="url" id="path" name="path" value={editedProject.path} onChange={handleChange} required></input>
                    <button type="submit">Confirm</button>
                </form>
            </div>
        );
    }

}