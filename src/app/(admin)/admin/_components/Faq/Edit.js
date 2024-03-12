import { useState } from 'react';
import {
  BooleanInput,
  Button,
  Confirm,
  Edit,
  NumberInput,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar as BaseToolbar,
  useDelete,
  useNotify,
  useRecordContext,
  useRedirect,
} from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';
import { useActiveFaqs } from './hooks';
import { AnswerTextInput } from './AnswerTextInput';
import { MAX_ACTIVE_FAQS, MIN_ACTIVE_FAQS } from './consts';

const TOO_MANY_ACTIVE_FAQS = 'Too many active FAQs. Please deactivate some first.';
const TOO_FEW_ACTIVE_FAQS = 'Too few active FAQs. Please activate some first.';

function DeleteButton() {
  const redirect = useRedirect();
  const record = useRecordContext();
  const notify = useNotify();
  const { total: activeFaqsCount } = useActiveFaqs();
  const [open, setOpen] = useState(false);

  const [remove, { isLoading }] = useDelete(
    'faq',
    { id: record?.id },
    {
      onSuccess: () => {
        setOpen(false);
        redirect(`/${RESOURCES.faq}`);
      },
    },
  );

  const handleClick = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);
  const handleConfirm = () => {
    if (record.isActive && activeFaqsCount <= MIN_ACTIVE_FAQS) {
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

// needed due to weird behavior of react-admin
// when using useRecordContext in a child component of Edit
// eslint-disable-next-line max-len
// https://stackoverflow.com/questions/70098250/how-to-access-record-inside-edit-function-without-having-to-use-simpleform
function ActiveStateSwitch() {
  const record = useRecordContext();
  const { total: activeFaqsCount } = useActiveFaqs();
  const validate = updatedIsActive => {
    const isTryingToActivate = !record.isActive && updatedIsActive;
    const isTryingToDeactivate = record.isActive && !updatedIsActive;
    if (isTryingToActivate && activeFaqsCount >= MAX_ACTIVE_FAQS) {
      return TOO_MANY_ACTIVE_FAQS;
    }

    if (isTryingToDeactivate && activeFaqsCount <= MIN_ACTIVE_FAQS) {
      return TOO_FEW_ACTIVE_FAQS;
    }
    return undefined;
  };

  return <BooleanInput validate={[validate]} label="Is Active" source="isActive" />;
}

export function FaqEdit() {
  return (
    <Edit>
      <SimpleForm toolbar={<Toolbar />}>
        <ActiveStateSwitch />
        <NumberInput label="Priority" source="priority" />
        <TextInput label="Question" source="question" validate={[required()]} multiline={true} fullWidth />
        <AnswerTextInput />
      </SimpleForm>
    </Edit>
  );
}
