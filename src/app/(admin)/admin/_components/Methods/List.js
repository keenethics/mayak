import React from 'react';
import { Datagrid, TextField, List, EditButton, DeleteWithConfirmButton } from 'react-admin';

export function MethodsList() {
  return (
    <List>
      <Datagrid rowClick="show" bulkActionButtons={false} sort={{ field: 'specialization.name' }}>
        <TextField source="specialization.name" label="Спеціалізація" />
        <TextField source="title" label="Назва" />
        <TextField source="description" label="Опис" />
        <EditButton label="Редагувати" />
        <DeleteWithConfirmButton
          confirmContent="Ви впевнені?"
          confirmTitle="Дані будуть видалені із бази."
          confirmColor="warning"
          label="Видалити"
        />
      </Datagrid>
    </List>
  );
}
