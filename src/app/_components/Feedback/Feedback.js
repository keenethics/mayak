'use client';

import React, { useState } from 'react';
import { useCreateFeedback } from '@/app/_hooks';
// import SendFeedback from '@/lib/validationSchemas/sendFeedbackSchema';
import { Modal } from '../Modal';

export function Feedback() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const testValue = {
    name: 'Vasja',
    phone: '+380962556232',
    callMe: true,
    email: 'some@gmail.com',
    message: 'message',
  };
  // const [feedBackFormValue, setFeedBackValue] = useState(); //! TODO use react-form or formik lib
  //! TODO use Zod validationSchema namely SendFeedback

  // SendFeedback
  const { mutate: createFeedback } = useCreateFeedback();
  const onAdd = () => {
    createFeedback(testValue, {
      // onSuccess: () => console.log('onSuccess: all OK'),
    });
  };

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const Example = (
    <div>
      <h3>Subtitle</h3>
      <br />
      <p>Modal content goes here.</p>
      <br />
      <button className="bg-secondary-200 text-tertiary-500" onClick={() => onAdd()}>
        submit form data
      </button>
    </div>
  );

  return (
    <div>
      <button onClick={toggleModal}>Open MODAL button</button>
      <Modal isOpen={isModalOpen} onClose={toggleModal} title="Title of modal" bgColor="bg-primary-200">
        {Example}
      </Modal>
    </div>
  );
}
