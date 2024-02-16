import { Create, SimpleForm, TextInput, BooleanInput, NumberInput, required } from 'react-admin';

export function CreateQa() {
  return (
    <Create>
      <SimpleForm>
        <TextInput label="Question" source="question" validate={[required()]} multiline={true} fullWidth />
        <TextInput label="Answer" source="answer" multiline={true} fullWidth />
        <NumberInput label="Priority" source="weight" />
        <BooleanInput label="Is Active" source="isActive" />
      </SimpleForm>
    </Create>
  );
}
