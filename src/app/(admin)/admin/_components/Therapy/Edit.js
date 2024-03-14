import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  NumberInput,
  Toolbar as BaseToolbar,
  SaveButton,
  required,
} from 'react-admin';

function Toolbar() {
  return (
    <BaseToolbar>
      <SaveButton />
    </BaseToolbar>
  );
}

export function TherapyEdit() {
  return (
    <Edit>
      <SimpleForm toolbar={<Toolbar />}>
        <BooleanInput label="Is Active" source="isActive" />
        <NumberInput label="Priority" source="priority" />
        <TextInput label="Type" source="type" validate={[required()]} />
        <TextInput label="Title" source="title" validate={[required()]} />
        <TextInput label="Description" source="description" validate={[required()]} multiline={true} fullWidth />
        <TextInput label="Path to image" source="imagePath" validate={[required()]} />
      </SimpleForm>
    </Edit>
  );
}
