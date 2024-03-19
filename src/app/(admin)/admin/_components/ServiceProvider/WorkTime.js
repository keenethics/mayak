import { ArrayField, Datagrid, TextField } from 'react-admin';

export function WorkTime() {
  return (
    <ArrayField label="Графік роботи" source="workTime">
      <Datagrid bulkActionButtons={false}>
        <TextField label="День" source="weekDay" />
        <TextField label="Час" source="time" />
      </Datagrid>
    </ArrayField>
  );
}
