import Header from "../../sections/header.tsx";
import Toolbar from "../../sections/toolbar.tsx";
import Content from "../../sections/content.tsx";
import Modal from "../../sections/modal.tsx";
import Footer from "../../sections/footer.tsx";
import React, {useState} from "react";
import {HeaderData, Team} from "../../types/types.tsx";
import {useLocation, useParams} from "react-router";
import TeamList from "../../components/content/teamList.tsx";
import AddTeamModal from "../../components/modals/team/addTeamModal.tsx";
import DeleteTeamModal from "../../components/modals/team/deleteTeamModal.tsx";
import EditTeamModal from "../../components/modals/team/editTeamModal.tsx";

export default function OrganizationsDetailView(){
    const { orgaId} = useParams();
    const { state } = useLocation();

    const [teams, setTeams] = useState<Team[]>(state.teams);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [selectedItem, setSelectedItem] = useState<Team | null>(null);
    const [modal, setModal] = useState<React.JSX.Element | null>(null);
    const [showModal, setShowModal] = useState(false);

    const teamFormEmpty = {
        name: ""
    }

    const teamFormFilled = {
        name: selectedItem?.name
    }
    const headerData: HeaderData = {
        title: state.name,
        navigation: {
            sections: [
                {
                    displayName: "Pages",
                    navItems: [
                        {
                            displayName:"Organizations",
                            targetPath: "/"
                        }
                    ]
                },
                {
                    navItems: [
                        {
                            displayName: "Sign Out",
                            targetPath: "/logout"
                        }
                    ]
                }
            ]
        }
    }

    const handleShowModal = (type: string) => {
        switch (type) {
            case 'add': setModal(<AddTeamModal title="Team" orgaId={orgaId} target={teamFormEmpty} closeCallback={handleCloseAddModal}/>); break;
            case 'delete': setModal(<DeleteTeamModal index={selectedIndex} orgaId={orgaId} closeCallback={handleCloseDeleteModal}/>); break;
            case 'edit': setModal(<EditTeamModal title="Team" orgaId={orgaId} targetId={selectedIndex} target={teamFormFilled} closeCallback={handleCloseEditModal}/>); break;
            default: return;
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleClick = (index: number) => {
        setSelectedIndex(index);
        const foundTeam = teams.filter((team) => team.id === index);
        setSelectedItem(foundTeam[0]);
    };

    const handleCloseAddModal = (team: Team) => {
        setTeams(prevTeams => [...prevTeams, team]);
        setShowModal(false);
    }

    const handleCloseDeleteModal = (id: number | null) => {
        const updatedList = teams.filter(team => team.id !== id);
        setTeams(updatedList);
        setShowModal(false);
    }

    const handleCloseEditModal = (team: Team) => {
        const updatedList = teams.map((teamOld) => {
            return teamOld.id === team.id ? team : teamOld;
        });
        setTeams(updatedList);
        setShowModal(false);
    }

    return(
        <>
            <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <Header data={headerData}/>
                <Toolbar handleShowModal={handleShowModal} selectedIndex={selectedIndex}/>
                <Content data={<TeamList data={teams} orgaId={orgaId} selectedIndex={selectedIndex} handleSelect={handleClick}/>} />
                <Modal active={showModal} form={modal} handleCloseModal={handleCloseModal}/>
                <Footer/>
            </div>
        </>
    )
}