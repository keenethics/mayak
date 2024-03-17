import React from 'react';
import { Datagrid, DeleteButton, EditButton, List, TextField } from 'react-admin';

export function MethodsList() {
  return (
    <List>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="title" label="Назва" />
        <TextField source="description" label="Опис" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}
