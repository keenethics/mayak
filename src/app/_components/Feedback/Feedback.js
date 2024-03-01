import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoveIcon from '@icons/loveIcon.svg';
import { useCreateFeedback } from '@/app/_hooks';
import SendFeedback from '@/lib/validationSchemas/sendFeedbackSchema';
import { Modal } from '../Modal';
import { TextInputField } from '../InputFields';
import { CheckBox } from '../CheckBox';
import { TextArea } from '../TextArea';
import { PillButton } from '../PillButton';
import { cn } from '@/utils/cn';
import { buttonColorVariant, buttonVariant } from '../PillButton/style';

const MAX_LENGTH = 320;

export function Feedback({ isFeedbackOpen, onClose }) {
  const [isFormOpen, setFormOpen] = useState(true);

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
      createFeedback(formData);

      setFormOpen(false);
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

  useEffect(() => {
    if (isFormOpen) return
    const timer = setTimeout(() => {
      setMessage('');
      setFormOpen(true);
      //TODO! redirect to "Бажаєте задонатити" modal window
      onClose()
    }, 4000);

    return () => clearTimeout(timer);
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

            <PillButton
              type="submit"
              variant={buttonVariant.filled}
              colorVariant={buttonColorVariant.filled.blue}
              className={cn('justify-self-end px-6 py-3 text-p3 font-bold text-primary-100')}
              aria-label="Click to send feedback data"
            >
              Надіслати
            </PillButton>
          </form>
        ) : (
          <div className="grid justify-items-center">
            <h3 className="pb-6 text-h3 font-bold">Дякую за повідомлення!</h3>
            <p className="text-p2">Наші менеджери незабаром звʼяжуться з Вами</p>
            <LoveIcon
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