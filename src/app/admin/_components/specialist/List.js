import React from 'react';
import { BooleanField, Datagrid, DateField, List, TextField } from 'react-admin';
import { specialistsFilters } from '@admin/filters';
import { ButtonDelete } from '@admin/components/ButtonDelete';

export function SpecialistsList() {
  return (
    <List sort={{ field: 'createdAt', order: 'DESC' }} filters={specialistsFilters}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="surname" />
        <DateField showTime source="createdAt" />
        <TextField source="formatOfWork" />
        <BooleanField source="isActive" />
        <ButtonDelete />
      </Datagrid>
    </List>
  );
}
