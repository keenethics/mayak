import React from 'react';
import { Datagrid, List, TextField, BooleanField, DateField, DeleteWithConfirmButton, EditButton } from 'react-admin';

export function EventList() {
  return (
    <List sort={{ field: 'createdAt', order: 'DESC' }}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="title" />
        <TextField source="organizerName" />
        <DateField source="eventDate" />
        <TextField source="format" />
        <DateField source="createdAt" />
        <BooleanField source="isActive" />
        <EditButton />
        <DeleteWithConfirmButton confirmTitle="Видалити подію?" />
      </Datagrid>
    </List>
  );
}
