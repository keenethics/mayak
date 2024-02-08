'use client';

import React, { useState } from 'react';
import { Modal } from '../Modal';

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const Example = (
    <div>
      <h2>This is a Modal</h2>
      <p>Modal content goes here.</p>
    </div>
  );

  return (
    <header className="flex justify-between bg-primary-100">
      <h1 className="p-3 text-h1 text-primary-700"> Header </h1>
      <button
        onClick={toggleModal}
        className="rounded-lg text-primary-500 outline"
      >
        Зворотній зв`язок
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        title="Title of modal"
        bgColor="bg-primary-200"
      >
        {Example}
        {/* //TODO ticket MID-** add "Feedback form" */}
      </Modal>
    </header>
  );
};
