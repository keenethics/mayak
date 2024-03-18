import React from 'react';
import { Datagrid, DeleteWithConfirmButton, EditButton, List, TextField } from 'react-admin';

export function MethodsList() {
  return (
    <List>
      <Datagrid rowClick="show" bulkActionButtons={false}>
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
