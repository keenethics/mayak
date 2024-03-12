'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LikeIcon from '@icons/likeIcon.svg';
import { Modal } from '@components/Modal';
import { TextInputField } from '@components/InputFields';
import { CheckBox } from '@components/CheckBox';
import { TextArea } from '@components/TextArea';
import { PillButton } from '@components/PillButton';
import { useCreateFeedback } from '@/app/_hooks';
import SendFeedback from '@/lib/validationSchemas/sendFeedbackSchema';
import { cn } from '@/utils/cn';

export function Feedback({ isFeedbackOpen, onClose }) {
  const [isFormOpen, setFormOpen] = useState(true);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isCallMe, setCallMe] = useState(true);
  const [message, setMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const { mutate: createFeedback } = useCreateFeedback();

  const onSubmit = e => {
    e.preventDefault();
    const formData = {
      name,
      phone,
      callMe: isCallMe,
      // I am forced to do exactly that, since I have to pass a valid email or "undefined" to the backend.
      // Input should have base value ""
      email: email.length ? email : undefined,
      message,
    };

    try {
      SendFeedback.parse(formData);
      setValidationErrors({});
      createFeedback(formData);

      setFormOpen(false);
    } catch (error) {
      const errors = error.errors.reduce((acc, validationError) => {
        const fieldName = validationError.path[0];
        const errorMessage = validationError.message;
        acc[fieldName] = errorMessage;
        return acc;
      }, {});
      setValidationErrors(errors);
    }
  };

  useEffect(() => {
    if (isFormOpen) return;
    const timer = setTimeout(() => {
      setMessage('');
      setFormOpen(true);
      // TODO! redirect to "Бажаєте задонатити" modal window
      onClose();
    }, 4000);

    // Existing lint rules do not allow this usage, but this code is required.
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timer);
    // any additional dependencies will be redundant
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormOpen]);

  return (
    <Modal isOpen={isFeedbackOpen} onClose={onClose} bgColor="bg-primary-200 ">
      <div className="px-[54px] pt-0">
        {isFormOpen ? (
          <form onSubmit={onSubmit} className="grid gap-y-7">
            <h3 className="text-h3 font-bold"> Хочете поділитись ідеями?</h3>
            <p className="text-p2">Залиште свої контактні дані і ми зв’яжемось з Вами</p>
            <TextInputField
              value={name}
              name="name"
              onChange={e => setName(e.target.value)}
              placeholder={`Прізвище та ім'я`}
              error={validationErrors.name}
              required
            />
            <TextInputField
              value={phone}
              name="phone"
              onChange={e => setPhone(e.target.value)}
              placeholder={`Номер телефону`}
              error={validationErrors.phone}
              required
            />
            <CheckBox
              onChange={() => setCallMe(prev => !prev)}
              checked={!isCallMe}
              name={'feedBack'}
              value={'CheckBox'}
              text={'Не телефонувати мені'}
            />
            <TextInputField
              value={email}
              type="email"
              name="email"
              onChange={e => setEmail(e.target.value)}
              placeholder={`Електронна пошта`}
              error={validationErrors.email}
            />
            <TextArea
              value={message}
              onChange={setMessage}
              maxLength={320}
              placeholder="Повідомлення"
              error={validationErrors.message}
            />
            <PillButton
              type="submit"
              variant="filled"
              colorVariant="blue"
              className="justify-self-end px-6 py-3 text-p3 font-bold text-primary-100"
              aria-label="Click to send feedback data"
            >
              Надіслати
            </PillButton>
          </form>
        ) : (
          <div className="grid justify-items-center">
            <h3 className="pb-6 text-h3 font-bold">Дякую за повідомлення!</h3>
            <p className="text-p2">Наші менеджери незабаром звʼяжуться з Вами</p>
            <LikeIcon
              alt="Thank you image"
              aria-label="Thank you image"
              priority="true"
              className={cn('my-20 h-[217px] w-[217px]')}
            />
          </div>
        )}
      </div>
    </Modal>
  );
}

Feedback.propTypes = {
  isFeedbackOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
