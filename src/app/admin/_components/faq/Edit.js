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

const TOO_MANY_ACTIVE_FAQS = `Too many active FAQs. Please deactivate some first.`;
const TOO_FEW_ACTIVE_FAQS = `At least five FAQ must be active. Pleace activate some first.`;

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
      notify(TOO_FEW_ACTIVE_FAQS, { type: 'error' });
      setOpen(false);
      return;
    }
    remove();
  };

  return (
    <>
      <Button label="Delete" onClick={handleClick} color="error" />
      <Confirm
        isOpen={open}
        loading={isLoading}
        title={`Delete post #${record?.id}`}
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
      errors.isActive = TOO_MANY_ACTIVE_FAQS;
    }

    if (isTryingToDeactivate && activeFaqsCount <= MIN_ACTIVE_FAQS) {
      errors.isActive = TOO_FEW_ACTIVE_FAQS;
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
