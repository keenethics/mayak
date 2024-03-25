import {
  Create,
  Edit,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
  useDataProvider,
  useRecordContext,
  DeleteWithConfirmButton,
  SaveButton,
  Toolbar,
} from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';

function TitleInput() {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const isDuplicate = async value => {
    // we need this to return undefined to prevent error in case when we are
    // on edit page and title didn't change
    if (record?.title === value) {
      return;
    }
    const { data: method } = await dataProvider.getList(RESOURCES.method, { filter: { title_eq: value } });
    // eslint-disable-next-line consistent-return
    if (method?.length) return 'Такий напрямок(метод) вже існує';
  };
  return <TextInput label="Назва" source="title" validate={[required("Обов'язкове поле"), isDuplicate]} />;
}

export function FormBase() {
  return (
    <>
      <TitleInput />
      <TextInput label="Опис" source="description" multiline fullWidth />
    </>
  );
}

export function MethodsCreate() {
  return (
    <Create
      redirect="list"
      transform={data => ({ ...data, specialization: { connect: { name: data.specialization } } })}
    >
      <SimpleForm>
        <SelectInput
          source="specialization"
          required
          label="Спеціалізація"
          choices={['Психолог', 'Психотерапевт'].map(entry => ({ id: entry, name: entry }))}
        />
        <FormBase />
      </SimpleForm>
    </Create>
  );
}

function CustomToolbar() {
  return (
    <Toolbar className="flex justify-between">
      <SaveButton />
      <DeleteWithConfirmButton
        confirmContent="Ви впевнені?"
        confirmTitle="Дані будуть видалені із бази."
        confirmColor="warning"
        label="Видалити"
      />
    </Toolbar>
  );
}
export function MethodsEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm toolbar={<CustomToolbar />}>
        <FormBase />
      </SimpleForm>
    </Edit>
  );
}
