import React from 'react';
import { Datagrid, List, TextField, BooleanField, DateField, DeleteWithConfirmButton } from 'react-admin';
import { eventFilters } from './filters';

export function EventList() {
  return (
    <List sort={{ field: 'createdAt', order: 'DESC' }} filters={eventFilters}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="title" />
        <TextField source="organizerName" />
        <DateField source="eventDate" />
        <TextField source="format" />
        <DateField source="createdAt" />
        <BooleanField source="isActive" />
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
