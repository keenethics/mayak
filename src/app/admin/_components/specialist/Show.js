import React from 'react';

import {
  Show,
  SimpleShowLayout,
  BooleanField,
  TextField,
  NumberField,
  ArrayField,
  SingleFieldList,
  ChipField,
  Datagrid,
  DateField,
} from 'react-admin';

export function SpecialistShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="surname" />
        <TextField source="gender" />
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
        <ArrayField source="specializations">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <ArrayField source="placesOfWork">
          <SingleFieldList linkType={false}>
            <ArrayField source="addresses">
              <Datagrid bulkActionButtons={false}>
                <TextField source="fullAddress" />
                <TextField source="nameOfClinic" />
                <TextField source="district.name" label="District" />
              </Datagrid>
            </ArrayField>
          </SingleFieldList>
        </ArrayField>
        <TextField source="description" />
        <TextField source="phone" />
        <TextField source="email" />
        <TextField source="website" />
      </SimpleShowLayout>
    </Show>
  );
}
