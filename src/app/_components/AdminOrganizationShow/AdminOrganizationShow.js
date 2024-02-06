import React from 'react';

import {
  Show,
  SimpleShowLayout,
  BooleanField,
  TextField,
  ArrayField,
  Datagrid,
  ReferenceOneField,
  NumberField,
} from 'react-admin';

export default function AdminOrganizationShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="createdAt" />
        <TextField source="formatOfWork" />
        <BooleanField source="isFreeReception" />
        <BooleanField source="isActive" />
        <NumberField source="yearsOfExperience" />
        <ArrayField source="organizationType">
          <Datagrid>
            <TextField source="name" />
          </Datagrid>
        </ArrayField>
        <ArrayField source="placesOfWork">
          <ArrayField source="addresses">
            <TextField source="nameOfClinic" />
            <TextField source="fullAddress" />
            <ReferenceOneField
              label="District"
              reference="district"
              target="district_id"
            >
              <TextField source="name" />
            </ReferenceOneField>
          </ArrayField>
        </ArrayField>
        <ArrayField source="therapies">
          <TextField source="name" />
        </ArrayField>
        <TextField source="description" />
        <TextField source="phone" />
        <TextField source="email" />
        <TextField source="website" />
      </SimpleShowLayout>
    </Show>
  );
}
