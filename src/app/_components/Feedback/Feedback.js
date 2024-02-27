import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCreateFeedback } from '@/app/_hooks';
import SendFeedback from '@/lib/validationSchemas/sendFeedbackSchema';
import { Modal } from '../Modal';
import { TextInputField } from '../InputFields';
import { CheckBox } from '../CheckBox';
import { TextArea } from '../TextArea';

const MAX_LENGTH = 320;

export function Feedback({ isFeedbackOpen, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isChecked, setChecked] = useState(true);
  const [message, setMessage] = useState('');

  const [validationErrors, setValidationErrors] = useState({});

  const { mutate: createFeedback } = useCreateFeedback();

  const onSubmit = e => {
    e.preventDefault();
    const formData = {
      name,
      phone,
      callMe: isChecked,
      email: email.length ? email : undefined,
      message,
    };

    try {
      SendFeedback.parse(formData);
      setValidationErrors({});
      createFeedback(formData, {
        // TODO redirect to "Thank you Modal Window"
        // onSuccess: () => console.log('onSuccess: SAVED IN DB'),
      });
    } catch (error) {
      const errors = {};
      error.errors.forEach(validationError => {
        const fieldName = validationError.path[0];
        const errorMessage = validationError.message;
        errors[fieldName] = errorMessage;
      });
      setValidationErrors(errors);
    }
  };

  return (
    <Modal isOpen={isFeedbackOpen} onClose={onClose} bgColor="bg-primary-200">
      <form onSubmit={onSubmit}>
        <h3 className="text-h3">Хочете поділитись ідеями?</h3>
        <TextInputField
          value={name}
          name="name"
          onChange={e => setName(e.target.value)}
          placeholder={`Прізвище та ім'я`}
          required
          error={validationErrors.name}
        />
        <TextInputField
          value={phone}
          name="phone"
          onChange={e => setPhone(e.target.value)}
          placeholder={`Номер телефону`}
          required
          error={validationErrors.phone}
        />
        <TextInputField
          value={email}
          type="email"
          name="email"
          onChange={e => setEmail(e.target.value)}
          placeholder={`Електронна пошта`}
          error={validationErrors.email}
        />
        <CheckBox
          onChange={() => setChecked(prev => !prev)}
          checked={!isChecked}
          name={'feedBack'}
          value={'CheckBox'}
          text={'Не телефонувати мені'}
        />

        <TextArea
          value={message}
          onChange={setMessage}
          maxLength={MAX_LENGTH}
          placeholder="Повідомлення"
          error={validationErrors.message}
        />

        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
}

Feedback.propTypes = {
  isFeedbackOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
