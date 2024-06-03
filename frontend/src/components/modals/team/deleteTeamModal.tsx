
interface DeleteTeamModalProps {
    closeCallback: (id: number | null) => void,
    index: number | null,
    orgaId: string | undefined
}
export default function DeleteTeamModal(modalProps: DeleteTeamModalProps){

    const handleSubmit = async (id: number | null) => {
        if (id == null) {
            return;
        }

        const requestData = {
            id: id
        };

        try {
            const response = await fetch('/api/organizations/' + modalProps.orgaId + '/teams/remove', {
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

            modalProps.closeCallback(id);

        } catch (error) {
            console.error('There was a problem with the request:', error);
        }
    };

    return (
        <div>
            <p>Are you sure you want to delete this Team?</p>
            <button style={{color: "white", marginTop: 10}} onClick={() => handleSubmit(modalProps.index)}>Delete</button>
        </div>
    )
}