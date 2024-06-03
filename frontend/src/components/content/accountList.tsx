import {AccountData} from "../../types/types.tsx";

type AccountListProps = {
    data: AccountData[],
    selectedIndex: number | null,
    handleSelect: (id: number) => void;
}
export default function AccountList({data, selectedIndex, handleSelect}: AccountListProps){

    if (data.length > 0) {
        return (
            <div className="card-list">
                {data.sort((pro1, pro2) => pro1.id - pro2.id).map((user) => (
                    <div key={user.id}
                         className={`card ${user.id === selectedIndex ? 'selected' : ''}`}
                         onClick={() => handleSelect(user.id)}>
                        <h2>{user.username}</h2>
                        <p>ID: {user.id}</p>
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            <div className="card">
                No result found.
            </div>
        )
    }
}