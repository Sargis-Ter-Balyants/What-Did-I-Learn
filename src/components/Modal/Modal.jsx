import React from "react";
import IMAGES from "../../utils/images";
import "./Modal.scss";

const Modal = ({ title, closeModal, submitModal, children }) => {
    return (
        <div
            className="edit-modal-wrapper"
            onClick={() => closeModal(false)}
        >
            <div
                className="edit-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="close-modal">
                    <img
                        src={IMAGES.closeIcon}
                        alt="Close icon"
                        onClick={() => closeModal(false)}
                    />
                </p>
                <div className="container">
                    <h3>{title}</h3>

                    {children}

                    <button
                        className="custom-button"
                        onClick={submitModal}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
