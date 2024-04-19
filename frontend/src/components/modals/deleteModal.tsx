interface DeleteModalProps {
    handleSubmit: (id: number) => void,
    index: number
}
export default function DeleteModal(deleteModalProps: DeleteModalProps) {
    return (
        <div>
            Are you sure you want to delete this project?
            <button onClick={() => deleteModalProps.handleSubmit(deleteModalProps.index)}>Delete</button>
        </div>
    );
}