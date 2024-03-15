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
import { useFormContext, useWatch } from 'react-hook-form';
import { useCallback } from 'react';

export function TherapiesCutsSelect() {
  const { data: therapiesList, isLoading: therapiesLoading } = useGetList(RESOURCES.therapy);
  const therapiesCuts = useWatch({ name: 'therapiesCuts' });
  const { setValue } = useFormContext();

  const therapiesChoices =
    therapiesList?.map(therapy => ({
      id: therapy.id,
      name: therapy.title,
      disabled: therapiesCuts ? therapiesCuts.some(therapyCut => therapyCut.therapyId === therapy.id) : false,
    })) ?? [];

  const resetRequests = useCallback(
    e => {
      if (therapiesCuts) {
        const index = Number(e.target.name.split('.')[1]); // therapiesCuts.[index].therapyId
        const newId = e.target.value;
        therapiesCuts[index] = { therapyId: newId, requests: [] };
        setValue('therapiesCuts', therapiesCuts);
      }
    },
    [setValue, therapiesCuts],
  );

  const getTherapyRequests = useCallback(
    therapyId => therapiesList.find(therapy => therapy.id === therapyId)?.requests ?? [],
    [therapiesList],
  );

  return (
    <ArrayInput source="therapiesCuts" isLoading={therapiesLoading} label="Типи терапій">
      <SimpleFormIterator fullWidth disableReordering={true}>
        <FormDataConsumer>
          {({ scopedFormData, getSource }) => {
            if (!scopedFormData) return null;
            return (
              <>
                <SelectInput
                  isLoading={therapiesLoading}
                  label="Тип терапії"
                  source={getSource('therapyId')}
                  fullWidth
                  choices={therapiesChoices}
                  onChange={resetRequests}
                />
                <AutocompleteArrayInput
                  isLoading={therapiesLoading}
                  label="Запити які лікуються типом терапії"
                  fullWidth
                  source={getSource('requests')}
                  choices={getTherapyRequests(scopedFormData.therapyId)}
                />
              </>
            );
          }}
        </FormDataConsumer>
      </SimpleFormIterator>
    </ArrayInput>
  );
}
