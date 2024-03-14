'use client';

import {
  ArrayInput,
  AutocompleteArrayInput,
  FormDataConsumer,
  SelectInput,
  SimpleFormIterator,
  useGetList,
} from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';

export function TherapiesCutsSelect() {
  const { data: therapiesList, isLoading: therapiesLoading } = useGetList(RESOURCES.therapy);

  if (therapiesLoading) return null;

  const therapyRequestById = id => therapiesList.find(therapy => therapy.id === id)?.requests ?? [];
  // const therapiesCuts = useWatch({ name: 'therapiesCuts' });

  return (
    <ArrayInput source="therapiesCuts" isLoading={therapiesLoading} label="Типи терапій">
      <SimpleFormIterator fullWidth disableReordering={true}>
        <SelectInput
          label="Тип терапії"
          source="therapyId"
          fullWidth
          choices={therapiesList.map(therapy => ({ id: therapy.id, name: therapy.title }))}
        />
        <FormDataConsumer>
          {({
            formData, // The whole form data
            scopedFormData, // The data for this item of the ArrayInput
            getSource, // A function to get the valid source inside an ArrayInput
          }) => {
            if (!formData || !scopedFormData) return null;
            const therapyRequests = therapyRequestById(scopedFormData.therapyId);
            // console.log({ scopedFormData: JSON.stringify(scopedFormData) });
            // console.log({ formData: JSON.stringify(formData) });
            return (
              <>
                <AutocompleteArrayInput
                  label="Запити які лікуються типом терапії"
                  fullWidth
                  source={getSource('requests')}
                  choices={therapyRequests}
                />
              </>
            );
          }}
        </FormDataConsumer>
      </SimpleFormIterator>
    </ArrayInput>
  );
}
