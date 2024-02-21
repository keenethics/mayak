import { TextInput, required } from 'react-admin';
import { useWatch } from 'react-hook-form';

export function AnswerTextInput() {
  const isActive = useWatch({ name: 'isActive' });
  return (
    <TextInput
      label="Answer"
      source="answer"
      // in case of field is empty, 'null' by default is being sent, but db requires empty string for such case
      parse={val => val || ''}
      validate={[isActive && required()]}
      multiline={true}
      fullWidth
    />
  );
}
