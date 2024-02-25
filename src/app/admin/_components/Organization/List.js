import React from 'react';
import { BooleanField, Datagrid, DateField, DeleteWithConfirmButton, List, TextField } from 'react-admin';
import { organizationFilters } from '@admin/filters';

export function OrganizationsList() {
  return (
    <List sort={{ field: 'createdAt', order: 'DESC' }} filters={organizationFilters}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <DateField showTime source="createdAt" />
        <TextField source="formatOfWork" />
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
