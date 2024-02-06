import React from 'react';

import {
  Datagrid, List, TextField, BooleanField,
} from 'react-admin';

// const searchFilter = [<SearchInput source="q" alwaysOn />];

export default function AdminOrganizationsList() {
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField source="name" />
        <TextField source="createdAt" />
        <TextField source="formatOfWork" />
        <BooleanField source="isActive" />
      </Datagrid>
    </List>
  );
}
