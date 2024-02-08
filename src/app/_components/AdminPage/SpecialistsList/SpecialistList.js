import React from 'react';

import {
  Datagrid, List, TextField, BooleanField, DateField,
} from 'react-admin';
import { specialistsFilters } from '../Filters';

export function SpecialistsList() {
  return (
    <List sort={{ field: 'createdAt', order: 'DESC' }} filters={specialistsFilters}>
      <Datagrid rowClick="show">
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="surname" />
        <DateField showTime source="createdAt" />
        <TextField source="formatOfWork" />
        <BooleanField source="isActive" />
      </Datagrid>
    </List>
  );
}
