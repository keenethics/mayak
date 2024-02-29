import React from 'react';
import { Datagrid, List, TextField, BooleanField, DateField } from 'react-admin';
import { organizationFilters } from '@admin/filters';

export function OrganizationsList() {
  return (
    <List sort={{ field: 'createdAt', order: 'DESC' }} filters={organizationFilters}>
      <Datagrid rowClick="show">
        <TextField label="Назва" source="name" />
        <TextField label="Формат послуг" source="formatOfWork" />
        <DateField label="Дата додавання в сервіс" showTime source="createdAt" />
        <BooleanField label="Активна/Неактивна" source="isActive" />
      </Datagrid>
    </List>
  );
}
