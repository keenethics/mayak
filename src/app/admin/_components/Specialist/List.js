import React from 'react';
import { Datagrid, List, TextField, BooleanField, DateField, FunctionField } from 'react-admin';
import { specialistsFilters } from '@admin/filters';
import { formatDaysOfWork } from '@/utils/formatDaysOfWorks';

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
        <FunctionField
          source="daysOfWork"
          render={record => formatDaysOfWork(record.daysOfWork).map((line, i) => <p key={i}>{line}</p>)}
          sortable={false}
        />
      </Datagrid>
    </List>
  );
}
