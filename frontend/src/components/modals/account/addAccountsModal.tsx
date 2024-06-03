import React from "react";
import {AccountData} from "../../../types/types.tsx";
import Select from "react-select";

type AddAccountModalProps = {
    source: AccountData[],
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
}
export default function AddAccountsModal({source, handleSubmit}: AddAccountModalProps){

    const options = source.map(data => {
        return {
            value: data.id,
            label: data.username
        }
    });

    return (
        <div>
            <h2>Add Accounts</h2>
            <form onSubmit={handleSubmit}>
                <Select options={options}/>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}