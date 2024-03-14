import { Create, SimpleForm, TextInput, NumberInput, BooleanInput, required } from 'react-admin';

export function TherapyCreate() {
  return (
    <Create>
      <SimpleForm>
        <BooleanInput label="Is Active" source="isActive" />
        <NumberInput label="Priority" source="priority" defaultValue={0} />
        <TextInput label="Type" source="type" validate={[required()]} />
        <TextInput label="Title" source="title" validate={[required()]} />
        <TextInput label="Description" source="description" validate={[required()]} multiline={true} fullWidth />
        <TextInput label="Path to image" source="imagePath" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
}
