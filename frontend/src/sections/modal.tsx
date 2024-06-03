import '../assets/css/sections/modal.css'
import React from "react";
import AlertProvider from "../util/AlertContext.tsx";

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
                        <AlertProvider>
                            {modalProps.form}
                        </AlertProvider>
                    </div>
                </div>
            </div>
        )
    }
}