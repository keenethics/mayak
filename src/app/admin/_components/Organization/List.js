import React from 'react';
import { Datagrid, List, TextField, BooleanField, DateField, FunctionField } from 'react-admin';
import { organizationFilters } from '@admin/filters';
import { DaysOfWorkList } from '@admin/components';

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
          render={record => <DaysOfWorkList rawDaysOfWork={record.daysOfWork} />}
          sortable={false}
        />
      </Datagrid>
    </List>
  );
}
