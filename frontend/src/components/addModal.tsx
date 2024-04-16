import React from "react";

interface AddModalProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
}
export default function AddModal(modalProps: AddModalProps) {
    return(
        <div>
            <h2>Add New Project</h2>
            <form onSubmit={modalProps.handleSubmit}>
                <label htmlFor="author">Author:</label>
                <input type="text" id="author" name="author" required/>
                <label htmlFor="path">URL:</label>
                <input type="url" id="path" name="path" required></input>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}