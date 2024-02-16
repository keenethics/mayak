import { useState } from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  NumberInput,
  Toolbar as BaseToolbar,
  SaveButton,
  required,
  useNotify,
  useRecordContext,
  useDelete,
  Confirm,
  Button,
} from 'react-admin';
import { useActiveFaqs } from './hooks';
import { AnswerTextInput } from './AnswerTextInput';
import { MAX_ACTIVE_FAQS, MIN_ACTIVE_FAQS } from './consts';

function DeleteButton() {
  const record = useRecordContext();
  const notify = useNotify();
  const { total: activeFaqsCount } = useActiveFaqs();
  const [open, setOpen] = useState(false);

  const [remove, { isLoading }] = useDelete('faq', { id: record && record.id });

  const handleClick = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);
  const handleConfirm = () => {
    if (activeFaqsCount <= MIN_ACTIVE_FAQS) {
      notify('At least five FAQ must be active. Pleace activate some first.', { type: 'error' });
      setOpen(false);
      return;
    }
    remove();
  };

  return (
    <>
      <Button label="Delete" onClick={handleClick} />
      <Confirm
        isOpen={open}
        loading={isLoading}
        title={`Delete post #${record && record.id}`}
        content="Are you sure you want to delete this item?"
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </>
  );
}

function Toolbar() {
  return (
    <BaseToolbar>
      <SaveButton />
      <DeleteButton />
    </BaseToolbar>
  );
}

export function EditFaq() {
  const { total: activeFaqsCount } = useActiveFaqs();

  const validate = updatedValues => {
    const isTryingToActivate = updatedValues.isActive;
    const isTryingToDeactivate = !updatedValues.isActive;
    const errors = {};

    if (isTryingToActivate && activeFaqsCount >= MAX_ACTIVE_FAQS) {
      errors.isActive = 'Too many active FAQs. Please deactivate some first.';
    }

    if (isTryingToDeactivate && activeFaqsCount <= MIN_ACTIVE_FAQS) {
      errors.isActive = 'At least five FAQ must be active. Pleace activate some first.';
    }

    return errors;
  };

  return (
    <Edit>
      <SimpleForm validate={validate} toolbar={<Toolbar />}>
        <BooleanInput label="Is Active" source="isActive" />
        <NumberInput label="Priority" source="priority" />
        <TextInput label="Question" source="question" validate={[required()]} multiline={true} fullWidth />
        <AnswerTextInput />
      </SimpleForm>
    </Edit>
  );
}
