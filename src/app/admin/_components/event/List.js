import React from 'react';
import { Datagrid, List, TextField, BooleanField, DateField } from 'react-admin';
import { eventFilters } from '@admin/filters';

export function EventsList() {
  return (
    <List sort={{ field: 'createdAt', order: 'DESC' }} filters={eventFilters}>
      <Datagrid rowClick="show">
        <TextField source="eventName" />
        <TextField source="organizerName" />
        <DateField source="eventDate" />
        <TextField source="format" />
        <DateField source="createdAt" />
        <BooleanField source="isActive" />
      </Datagrid>
    </List>
  );
}
