import '../assets/css/sections/modal.css'
import React from "react";

interface ModalProps {
    active: boolean,
    handleCloseModal: () => void,
    form: React.JSX.Element | null
}

export default function Modal(modalProps: ModalProps) {

    if (modalProps.active) {
        return (
            <div className="modal-overlay">
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={modalProps.handleCloseModal}>&times;</span>
                        {modalProps.form}
                    </div>
                </div>
            </div>
        )
    }
}