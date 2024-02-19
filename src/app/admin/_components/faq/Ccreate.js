import { Create, SimpleForm, TextInput, NumberInput, required } from 'react-admin';
import { AnswerTextInput } from './AnswerTextInput';


export function CreateFaq() {
  return (
    <Create>
      <SimpleForm>
        <NumberInput label="Priority" source="priority" />
        <TextInput label="Question" source="question" validate={[required()]} multiline={true} fullWidth />
        <AnswerTextInput />
      </SimpleForm>
    </Create>
  );
}
