import React from 'react';
import { BooleanField, Datagrid, DateField, List, TextField } from 'react-admin';
import { organizationFilters } from '@admin/filters';
import { ButtonDelete } from '@admin/components/ButtonDelete';

export function OrganizationsList() {
  return (
    <List sort={{ field: 'createdAt', order: 'DESC' }} filters={organizationFilters}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <DateField showTime source="createdAt" />
        <TextField source="formatOfWork" />
        <BooleanField source="isActive" />
        <ButtonDelete />
      </Datagrid>
    </List>
  );
}
