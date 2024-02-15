"use client"
import React, { useState } from 'react';
import { Modal } from '../Modal';

export function Feedback() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(prevState => !prevState);
    };

    return (
        <div>
            <button onClick={toggleModal}>click</button>
            <Modal
                isOpen={isModalOpen}
                onClose={toggleModal}
                title="Title of modal"
                bgColor="bg-primary-200"
            >
                <div>
                    <h3>This is a subtitle</h3>
                    <p>Modal content goes here.</p>
                </div></Modal>
        </div>
    );
}
