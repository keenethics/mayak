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
import { useWatch } from 'react-hook-form';

export function TherapiesCutsSelect() {
  const { data: therapiesList, isLoading: therapiesLoading } = useGetList(RESOURCES.therapy);
  const therapiesCuts = useWatch({ name: 'therapiesCuts' });

  if (therapiesLoading) return null;

  const therapiesChoices = therapiesList.map(therapy => ({
    id: therapy.id,
    name: therapy.title,
    disabled: therapiesCuts ? therapiesCuts.some(therapyCut => therapyCut.therapyId === therapy.id) : false,
  }));

  const therapyRequestById = id => therapiesList.find(therapy => therapy.id === id)?.requests ?? [];

  return (
    <ArrayInput source="therapiesCuts" isLoading={therapiesLoading} label="Типи терапій">
      <SimpleFormIterator fullWidth disableReordering={true}>
        <SelectInput
          isLoading={therapiesLoading}
          label="Тип терапії"
          source="therapyId"
          fullWidth
          choices={therapiesChoices}
        />
        <FormDataConsumer>
          {({
            formData, // The whole form data
            scopedFormData, // The data for this item of the ArrayInput
            getSource, // A function to get the valid source inside an ArrayInput
          }) => {
            if (!formData || !scopedFormData) return null;
            const therapyRequests = therapyRequestById(scopedFormData.therapyId);

            return (
              <>
                <AutocompleteArrayInput
                  isLoading={therapiesLoading}
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
