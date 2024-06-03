import React, {useEffect, useState} from "react";
import {HeaderData, Project} from "../../types/types.tsx";
import axios from "axios";
import AddModal from "../../components/modals/organization/addModal.tsx";
import DeleteModal from "../../components/modals/organization/deleteModal.tsx";
import EditModal from "../../components/modals/organization/editModal.tsx";
import Header from "../../sections/header.tsx";
import Toolbar from "../../sections/toolbar.tsx";
import Content from "../../sections/content.tsx";
import ProjectList from "../../components/content/projectList.tsx";
import Modal from "../../sections/modal.tsx";
import Footer from "../../sections/footer.tsx";

export default function ProjectsView(){
    const [projects, setProjects] = useState<Project[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [selectedItem, setSelectedItem] = useState<Project | null>(null)
    const [modal, setModal] = useState<React.JSX.Element | null>(null);

    const projectForm: Project = {
        id:0,
        path: "",
        author: ""
    }
    const headerData: HeaderData = {
        title: "Projects",
        navigation: {
            sections: [
                {
                    displayName: "Pages",
                    navItems: [
                        {
                            displayName:"Organizations",
                            targetPath: "/"
                        },
                        {
                            displayName: "Teams",
                            targetPath: "/teams"
                        },
                        {
                            displayName: "Projects",
                            targetPath: "/projects"
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
        setSelectedIndex(index);
        const foundProject = projects.filter((project) => project.id === index);
        setSelectedItem(foundProject[0]);
    };

    const handleShowModal = (type: string) => {
        switch (type) {
            case 'add': setModal(<AddModal title="Project" target={projectForm} handleSubmit={handleAddFormSubmit}/>); break;
            case 'delete': setModal(<DeleteModal handleSubmit={handleDeleteFormSubmit} index={selectedIndex}/>); break;
            case 'edit': setModal(<EditModal title="Project" target={selectedItem} handleSubmit={(event) => handleEditFormSubmit(event, selectedIndex)}/>); break;
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
                <Header data={headerData}/>
                <Toolbar handleShowModal={handleShowModal} selectedIndex={selectedIndex}/>
                <Content data={<ProjectList data={projects} selectedProjectIndex={selectedIndex} handleSelect={handleProjectClick}/>} />
                <Modal active={showModal} form={modal} handleCloseModal={handleCloseModal}/>
                <Footer/>
            </div>
        </>
    )
}