import { Create, SimpleForm, TextInput, required } from 'react-admin';

export function ClientCategoryCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput label="Категорія клієнтів" source="name" validate={[required()]} multiline={true} fullWidth />
      </SimpleForm>
    </Create>
  );
}
