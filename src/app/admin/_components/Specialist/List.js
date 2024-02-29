import React from 'react';
import { Datagrid, List, TextField, BooleanField, DateField } from 'react-admin';
import { specialistsFilters } from '@admin/filters';

export function SpecialistsList() {
  return (
    <List sort={{ field: 'createdAt', order: 'DESC' }} filters={specialistsFilters}>
      <Datagrid rowClick="show">
        <TextField label="Ім'я" source="firstName" />
        <TextField label="Прізвище" source="lastName" />
        <TextField label="По-батькові" source="surname" />
        <TextField label="Формат послуг" source="formatOfWork" />
        <DateField label="Дата додавання в сервіс" showTime source="createdAt" />
        <BooleanField label="Активний/Неактивний" source="isActive" />
      </Datagrid>
    </List>
  );
}
