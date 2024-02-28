import React from 'react';

import {
  Show,
  SimpleShowLayout,
  BooleanField,
  TextField,
  ArrayField,
  Datagrid,
  NumberField,
  DateField,
  ChipField,
  SingleFieldList,
  FunctionField,
} from 'react-admin';
import { DaysOfWorkList } from '../DaysOfWorkList';

export function OrganizationShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" />
        <DateField showTime source="createdAt" />
        <TextField source="formatOfWork" />
        <BooleanField source="isFreeReception" />
        <BooleanField source="isActive" />
        <NumberField source="yearsOfExperience" />
        <ArrayField source="therapies">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <ArrayField source="addresses">
          <Datagrid bulkActionButtons={false}>
            <TextField source="fullAddress" />
            <TextField source="nameOfClinic" />
            <TextField source="district.name" label="District" />
          </Datagrid>
        </ArrayField>
        <ArrayField source="type">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <TextField source="description" />
        <TextField source="phone" />
        <TextField source="email" />
        <TextField source="website" />
        <FunctionField source="daysOfWork" render={record => <DaysOfWorkList rawDaysOfWork={record.daysOfWork} />} />
      </SimpleShowLayout>
    </Show>
  );
}
