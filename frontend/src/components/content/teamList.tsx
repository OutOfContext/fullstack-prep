import { Team} from "../../types/types.tsx";
import {Link} from "react-router-dom";
import {ArrowRightCircle} from "iconoir-react";

type TeamListProps = {
    data: Team[],
    orgaId: string | undefined,
    selectedIndex: number | null,
    handleSelect: (id: number) => void;
}
export default function TeamList({data, orgaId, selectedIndex, handleSelect}: TeamListProps){

    if (data.length > 0) {
        return (
            <div className="card-list">
                {data.sort((pro1, pro2) => pro1.id - pro2.id).map((team) => (
                    <div key={team.id}
                         className={`card ${team.id === selectedIndex ? 'selected' : ''}`}
                         onClick={() => handleSelect(team.id)}>
                        <h2>{team.name}</h2>
                        <p>ID: {team.id}</p>
                        <div style={{marginTop: 20}}>
                            <Link to={"/organizations/" + orgaId + "/teams/" + team.id} state={team}><ArrowRightCircle color="black" width="34" height="34"></ArrowRightCircle></Link>
                        </div>
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