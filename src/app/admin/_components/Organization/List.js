import React from 'react';
import { Datagrid, List, TextField, BooleanField, DateField, FunctionField } from 'react-admin';
import { organizationFilters } from '@admin/filters';
import { formatDaysOfWork } from '@/utils/formatDaysOfWorks';

export function OrganizationList() {
  return (
    <List sort={{ field: 'createdAt', order: 'DESC' }} filters={organizationFilters}>
      <Datagrid rowClick="show">
        <TextField source="name" />
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
