interface DeleteModalProps {
    closeCallback: (id: number | null) => void,
    index: number | null
}
export default function DeleteModal(deleteModalProps: DeleteModalProps) {

    const handleSubmit = async (id: number | null) => {
        if (id == null) {
            return;
        }

        const requestData = {
            id: id
        };

        try {
            const response = await fetch('/api/organizations/remove', {
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

            deleteModalProps.closeCallback(requestData.id);

        } catch (error) {
            console.error('There was a problem with the request:', error);
        }
    };

    return (
        <div>
            <p>Are you sure you want to delete this project?</p>
            <button style={{color: "white", marginTop: 10}} onClick={() => handleSubmit(deleteModalProps.index)}>Delete</button>
        </div>
    );
}