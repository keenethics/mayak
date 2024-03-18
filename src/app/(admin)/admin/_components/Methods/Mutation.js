import { Create, Edit, SimpleForm, TextInput, required } from 'react-admin';

export function MethodsForm() {
  return (
    <SimpleForm>
      <TextInput label="Назва" source="title" validate={[required("Обов'язкове поле")]} />
      <TextInput label="Опис" source="description" multiline fullWidth />
    </SimpleForm>
  );
}

export function MethodsCreate() {
  return (
    <Create redirect="list">
      <MethodsForm />
    </Create>
  );
}

export function MethodsEdit() {
  return (
    <Edit redirect="list">
      <MethodsForm />
    </Edit>
  );
}
