import { Create, SimpleForm, TextInput, required } from 'react-admin';

export function CreateCategory() {

  return (
    <Create>
      <SimpleForm>
        <TextInput label="Назва" source="title" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
}
