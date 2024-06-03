import Header from "../../sections/header.tsx";
import Toolbar from "../../sections/toolbar.tsx";
import Content from "../../sections/content.tsx";
import Modal from "../../sections/modal.tsx";
import Footer from "../../sections/footer.tsx";
import React, {useEffect, useState} from "react";
import {AccountData, HeaderData} from "../../types/types.tsx";
import DeleteModal from "../../components/modals/organization/deleteModal.tsx";
import EditModal from "../../components/modals/organization/editModal.tsx";
import AccountList from "../../components/content/accountList.tsx";
import {useLocation, useParams} from "react-router";
import AddAccountsModal from "../../components/modals/account/addAccountsModal.tsx";
import axios from "axios";

export default function TeamsDetailView(){
    const { orgaId, teamId} = useParams();
    const { state } = useLocation();
    const [users, setUsers] = useState<AccountData[]>(state.users);
    const [accountList, setAccountList] = useState<AccountData[]>([])
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [selectedItem, setSelectedItem] = useState<AccountData | null>(null);
    const [modal, setModal] = useState<React.JSX.Element | null>(null);
    const [showModal, setShowModal] = useState(false);

    const accountForm = {
        id:0,
        username: "",

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

    useEffect(() => {
        axios.get("/api/accounts", {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            console.log(res);
            setAccountList(res.data?.content);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    const handleShowModal = (type: string) => {
        switch (type) {
            case 'add': setModal(<AddAccountsModal source={accountList} handleSubmit={handleAddFormSubmit}/>); break;
            case 'delete': setModal(<DeleteModal index={selectedIndex} />); break;
            case 'edit': setModal(<EditModal title="Account" target={selectedItem} handleSubmit={(event) => handleEditFormSubmit(event, selectedIndex)}/>); break;
            default: return;
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleClick = (index: number) => {
        setSelectedIndex(index);
        const foundUser = users.filter((user) => user.id === index);
        setSelectedItem(foundUser[0]);
    };
    const handleAddFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const requestData = {
            name: formData.get('name')
        };

        try {
            const response = await fetch('/api/organizations/' + orgaId + '/teams/' + teamId + '/accounts/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                console.log('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response from server:', data);

            setUsers(prevUsers => [...prevUsers, data.content]);
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
            const response = await fetch('/api/accounts/remove', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                console.log('Network response was not ok');
            }

            const updatedList = users.filter(user => user.id !== id);
            setUsers(updatedList);
            setShowModal(false);
        } catch (error) {
            console.error('There was a problem with the request:', error);
        }
    };

    const handleEditFormSubmit = async (event: React.FormEvent<HTMLFormElement>, id: number | null) => {
        event.preventDefault();
        if (id === null) {
            return;
        }

        const formData = new FormData(event.currentTarget);
        const requestData = {
            id: id,
            name: formData.get('name')
        };

        try {
            const response = await fetch('/api/accounts/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                console.log('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response from server:', data);

            const updatedList = users.map((user) => {
                return user.id === data.content.id ? data.content : user;
            });
            setUsers(updatedList);
            setShowModal(false);
        } catch (error) {
            console.error('There was a problem with the request:', error);
        }
    };

    return(
        <>
            <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <Header data={headerData}/>
                <Toolbar handleShowModal={handleShowModal} selectedIndex={selectedIndex}/>
                <Content data={<AccountList data={users} selectedIndex={selectedIndex} handleSelect={handleClick}/>} />
                <Modal active={showModal} form={modal} handleCloseModal={handleCloseModal}/>
                <Footer/>
            </div>
        </>
    )
}