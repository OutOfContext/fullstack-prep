import React, {useEffect, useState} from "react";
import Header from "../../sections/header.tsx";
import Content from "../../sections/content.tsx";
import Footer from "../../sections/footer.tsx";
import {HeaderData, Organization} from "../../types/types.tsx";
import Toolbar from "../../sections/toolbar.tsx";
import Modal from "../../sections/modal.tsx";
import AddModal from "../../components/modals/organization/addModal.tsx";
import DeleteModal from "../../components/modals/organization/deleteModal.tsx";
import EditModal from "../../components/modals/organization/editModal.tsx";
import "../../assets/css/pages/overview.css";
import OrganizationList from "../../components/content/organizationList.tsx";
import axios from "axios";
import {useNavigate} from "react-router";

export default function OrganizationsView() {
    const navigate = useNavigate();
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [selectedItem, setSelectedItem] = useState<Organization | null>(null);
    const [modal, setModal] = useState<React.JSX.Element | null>(null);
    const [showModal, setShowModal] = useState(false);


    const orgaFormEmpty = {
        name: ""
    }

    const orgaFormFilled = {
        name: selectedItem?.name
    }

    const headerData: HeaderData = {
        title: "Organizations",
        navigation: {
            sections: [
                {
                    displayName: "Pages",
                    navItems: [
                        {
                            displayName: "Organizations",
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

    useEffect(() => {
        axios.get("/api/organizations", {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        }).then(res => {
            if (res.data.status >= 200) {
                setOrganizations(res.data.content);
            }
        }).catch(err => {
            if (err.response.status >= 400) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        })
    }, [navigate])

    const handleShowModal = (type: string) => {
        switch (type) {
            case 'add':
                setModal(<AddModal title="Organization" target={orgaFormEmpty} closeCallback={handleCloseAddModal}/>);
                break;
            case 'delete':
                setModal(<DeleteModal index={selectedIndex} closeCallback={handleCloseDeleteModal}/>);
                break;
            case 'edit':
                setModal(<EditModal title="Organization" target={orgaFormFilled} targetId={selectedIndex} closeCallback={handleCloseEditModal}/>);
                break;
            default:
                return;
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleCloseAddModal = (organization: Organization) => {
        setOrganizations(prevOrgas => [...prevOrgas, organization]);
        setShowModal(false);
    };

    const handleCloseDeleteModal = (id: number | null) => {
        const updatedList = organizations.filter(orga => orga.id !== id);
        setOrganizations(updatedList);
        setShowModal(false);
    }

    const handleCloseEditModal = (organization: Organization) => {
        const updatedList = organizations.map((orga) => {
            return orga.id === organization.id ? organization : orga;
        });
        setOrganizations(updatedList);
        setShowModal(false);
    }
    const handleClick = (index: number) => {
        setSelectedIndex(index);
        const foundOrga = organizations.filter((orga) => orga.id === index);
        setSelectedItem(foundOrga[0]);
    };

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <Header data={headerData}/>
                <Toolbar handleShowModal={handleShowModal} selectedIndex={selectedIndex}/>
                <Content data={<OrganizationList data={organizations} selectedIndex={selectedIndex}
                                                 handleSelect={handleClick}/>}/>
                <Modal active={showModal} form={modal} handleCloseModal={handleCloseModal}/>
                <Footer/>
            </div>
        </>
    )
}