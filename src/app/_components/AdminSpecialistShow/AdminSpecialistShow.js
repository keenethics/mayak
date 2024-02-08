import React from 'react';

import {
  Show,
  SimpleShowLayout,
  BooleanField,
  TextField,
  NumberField,
} from 'react-admin';

export default function AdminSpecialistShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="surname" />
        <TextField source="gender" />
        <TextField source="createdAt" />
        <TextField source="formatOfWork" />
        <BooleanField source="isFreeReception" />
        <BooleanField source="isActive" />
        <NumberField source="yearsOfExperience" />
        {/* <ArrayField source="therapies">
          <TextField source="name"></TextField>
        </ArrayField> */}
        {/* <ReferenceManyField
          label="Places of work"
          target="specialists"
          reference="Specialization"
        >
          <Datagrid>
            <TextField source="id" />
            <TextField source="createdAt" />
          </Datagrid>
        </ReferenceManyField> */}
        {/* <ReferenceManyField
          label="Places of work"
          target="specialistId"
          reference="PlaceOfWork"
        >
          <Datagrid>
            <TextField source="id" />
            <TextField source="createdAt" />
          </Datagrid>
        </ReferenceManyField> */}
        {/* <ArrayField source="therapies">
          <TextField source="name" />
        </ArrayField> */}
        <TextField source="description" />
        <TextField source="phone" />
        <TextField source="email" />
        <TextField source="website" />
      </SimpleShowLayout>
    </Show>
  );
}
