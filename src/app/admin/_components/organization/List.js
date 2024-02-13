import React from 'react';
import { Datagrid, List, TextField, BooleanField, DateField } from 'react-admin';
import { organizationFilters } from '@admin/filters';

export function OrganizationsList() {
  return (
    <List sort={{ field: 'createdAt', order: 'DESC' }} filters={organizationFilters}>
      <Datagrid rowClick="show">
        <TextField source="name" />
        <DateField showTime source="createdAt" />
        <TextField source="formatOfWork" />
        <BooleanField source="isActive" />
      </Datagrid>
    </List>
  );
}
