import {Organization} from "../../types/types.tsx";
import {ArrowRightCircle} from "iconoir-react";
import {Link} from "react-router-dom";

type OrganizationListProps = {
    data: Organization[],
    selectedIndex: number | null,
    handleSelect: (id: number) => void;
}
export default function OrganizationList({data, selectedIndex, handleSelect} : OrganizationListProps) {

    if (data.length > 0) {
        return (
            <div className="card-list">
                {data.sort((pro1, pro2) => pro1.id - pro2.id).map((orga) => (
                    <div key={orga.id}
                         className={`card ${orga.id === selectedIndex ? 'selected' : ''}`}
                         onClick={() => handleSelect(orga.id)}>
                        <h2>{orga.name}</h2>
                        <p>ID: {orga.id}</p>
                        <div style={{marginTop: 20}}>
                            <Link to={"/organizations/" + orga.id} state={orga}><ArrowRightCircle color="black" width="34" height="34"></ArrowRightCircle></Link>
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