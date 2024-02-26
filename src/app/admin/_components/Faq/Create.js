import { Create, SimpleForm, TextInput, NumberInput, required } from 'react-admin';

export function FaqCreate() {
  return (
    <Create>
      <SimpleForm>
        <NumberInput label="Priority" source="priority" />
        <TextInput label="Question" source="question" validate={[required()]} multiline={true} fullWidth />
        <TextInput label="Answer" source="answer" validate={[required()]} multiline={true} fullWidth />
      </SimpleForm>
    </Create>
  );
}
