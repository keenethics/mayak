import { TextInput, required } from 'react-admin';
import { useWatch } from 'react-hook-form';

export function AnswerTextInput() {
  const isActive = useWatch({ name: 'isActive' });
  return <TextInput label="Answer" source="answer" validate={[isActive && required()]} multiline={true} fullWidth />;
}
