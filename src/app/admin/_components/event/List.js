import React from 'react';
import { Datagrid, List, TextField, BooleanField, DateField, DeleteWithConfirmButton } from 'react-admin';
import { eventFilters } from '@admin/filters';

export function EventsList() {
  return (
    <List sort={{ field: 'createdAt', order: 'DESC' }} filters={eventFilters}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="eventName" />
        <TextField source="organizerName" />
        <DateField source="eventDate" />
        <TextField source="format" />
        <DateField source="createdAt" />
        <BooleanField source="isActive" />
        <DeleteWithConfirmButton confirmTitle="Видалити подію?" />
      </Datagrid>
    </List>
  );
}
