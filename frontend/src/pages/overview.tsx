import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "../sections/header.tsx";
import Content from "../sections/content.tsx";
import Footer from "../sections/footer.tsx";
import {HeaderData, Project} from "../types/types.tsx";
import Toolbar from "../sections/toolbar.tsx";
import Modal from "../sections/modal.tsx";
import AddModal from "../components/modals/addModal.tsx";
import DeleteModal from "../components/modals/deleteModal.tsx";
import EditModal from "../components/modals/editModal.tsx";
import ProjectList from "../components/content/projectList.tsx";
import "../assets/css/pages/overview.css";

export default function Overview() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [modal, setModal] = useState<React.JSX.Element | null>(null);

    const headerData: HeaderData = {
        title: "Overview",
        navigation: {
            sections: [
                {
                    displayName: "Pages",
                    navItems: [
                        {
                            displayName:"Home",
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
        axios.get("/api/projects", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
            .then(res => {
                if (res.data.status === 200) {
                    setProjects(res.data.content)
                } else {
                    alert("Error while loading data!")
                }
            })
            .catch(err => {
                console.log("Error: ", err);
            })
    }, [])

    const handleProjectClick = (index: number) => {
        setSelectedProjectIndex(index);
        const foundProject = projects.filter((project) => project.id === index);
        setSelectedProject(foundProject[0]);
    };

    const handleShowModal = (type: string) => {
        switch (type) {
            case 'add': setModal(<AddModal handleSubmit={handleAddFormSubmit}/>); break;
            case 'delete': setModal(<DeleteModal handleSubmit={handleDeleteFormSubmit} index={selectedProjectIndex ? selectedProjectIndex : 0}/>); break;
            case 'edit': setModal(<EditModal project={selectedProject} handleSubmit={(event) => handleEditFormSubmit(event, selectedProjectIndex)}/>); break;
            default: return;
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAddFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const requestData = {
            author: formData.get('author'),
            path: formData.get('path')
        };

        try {
            const response = await fetch('/api/projects/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response from server:', data);

            setProjects(prevProjects => [...prevProjects, data.content]);
            setShowModal(false);
        } catch (error) {
            console.error('There was a problem with the request:', error);
        }
    };

    const handleDeleteFormSubmit = async (id: number | null) => {
        if (id == null) {
            return;
        }

        const requestData = {
            id: id
        };

        try {
            const response = await fetch('/api/projects/remove', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response from server:', data);

            const updatedList = projects.filter(project => project.id !== id);
            setProjects(updatedList);
            setShowModal(false);
        } catch (error) {
            console.error('There was a problem with the request:', error);
        }
    };

    const handleEditFormSubmit = async (event: React.FormEvent<HTMLFormElement>, id: number | null) => {
        event.preventDefault();
        console.log(event);
        console.log(id);
        if (id === null) {
            return;
        }

        const formData = new FormData(event.currentTarget);
        const requestData = {
            id: id,
            author: formData.get('author'),
            path: formData.get('path')
        };

        try {
            const response = await fetch('/api/projects/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response from server:', data);

            const updatedList = projects.map((project) => {
                return project.id === data.content.id ? data.content : project;
            });
            setProjects(updatedList);
            setShowModal(false);
        } catch (error) {
            console.error('There was a problem with the request:', error);
        }
    };

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <Header data={headerData} breadcrumbs={true}/>
                <Toolbar handleShowModal={handleShowModal} selectedProjectIndex={selectedProjectIndex}/>
                <Content data={<ProjectList data={projects} selectedProjectIndex={selectedProjectIndex} handleSelect={handleProjectClick}/>} />
                <Modal active={showModal} form={modal} handleCloseModal={handleCloseModal}/>
                <Footer/>
            </div>
        </>
    )
}