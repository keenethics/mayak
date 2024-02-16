'use client';

import { Edit, SimpleForm, TextInput, BooleanInput, NumberInput, required } from 'react-admin';
import { useActiveFaqs } from './hooks';
import { AnswerTextInput } from './AnswerTextInput';
import { MAX_ACTIVE_FAQS, MIN_ACTIVE_FAQS } from './consts';

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
      errors.isActive = 'At least five FAQ must be active.';
    }

    return errors;
  };

  return (
    <Edit>
      <SimpleForm validate={validate}>
        <BooleanInput label="Is Active" source="isActive" />
        <NumberInput label="Priority" source="priority" />
        <TextInput label="Question" source="question" validate={[required()]} multiline={true} fullWidth />
        <AnswerTextInput />
      </SimpleForm>
    </Edit>
  );
}
