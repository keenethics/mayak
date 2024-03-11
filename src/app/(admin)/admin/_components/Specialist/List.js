import React from 'react';
import { BooleanField, Datagrid, DateField, DeleteWithConfirmButton, List, TextField } from 'react-admin';
import { specialistsFilters } from '@admin/filters';

export function SpecialistsList() {
  return (
    <List sort={{ field: 'createdAt', order: 'DESC' }} filters={specialistsFilters}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField label="Ім'я" source="firstName" />
        <TextField label="Прізвище" source="lastName" />
        <TextField label="По-батькові" source="surname" />
        <TextField label="Формат послуг" source="formatOfWork" />
        <DateField label="Дата додавання в сервіс" showTime source="createdAt" />
        <BooleanField label="Активний/Неактивний" source="isActive" />
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
