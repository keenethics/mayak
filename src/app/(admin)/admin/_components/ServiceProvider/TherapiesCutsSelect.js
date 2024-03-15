'use client';

import {
  ArrayInput,
  AutocompleteArrayInput,
  FormDataConsumer,
  ReferenceArrayInput,
  ReferenceInput,
  SelectInput,
  SimpleFormIterator,
  required,
  useGetList,
} from 'react-admin';
import { FORM_TYPES, RESOURCES } from '@admin/_lib/consts';
import { useFormContext, useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

function TherapiesCutForm({ getSource, resetRequests, choices, requests, loading, type, readOnly = false }) {
  return (
    <>
      {type === 'create' && (
        <>
          <SelectInput
            isLoading={loading}
            label="Тип терапії"
            source={getSource('therapyId')}
            fullWidth
            choices={choices}
            onChange={resetRequests}
          />
          <AutocompleteArrayInput
            isLoading={loading}
            label="Запити які лікуються типом терапії"
            fullWidth
            source={getSource('requests')}
            choices={requests}
          />
        </>
      )}
      {type === 'edit' && (
        <>
          <ReferenceInput source={getSource('therapyId')} reference="Therapy">
            <SelectInput
              InputProps={{
                readOnly,
              }}
              label="Тип терапії"
              optionText="title"
              optionValue="id"
              validate={required()}
              fullWidth
            />
          </ReferenceInput>
          <ReferenceArrayInput source={getSource('requestsIds')} reference="Request">
            <AutocompleteArrayInput
              isLoading={loading}
              label="Запити які лікуються типом терапії"
              fullWidth
              optionText="name"
              optionValue="id"
            />
          </ReferenceArrayInput>
        </>
      )}
    </>
  );
}

TherapiesCutForm.propTypes = {
  getSource: PropTypes.func,
  resetRequests: PropTypes.func,
  choices: PropTypes.array,
  requests: PropTypes.array,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
  readOnly: PropTypes.bool,
};

export function TherapiesCutsSelect({ type = 'create' }) {
  const { data: therapiesList, isLoading: therapiesLoading } = useGetList(RESOURCES.therapy);

  const { setValue } = useFormContext();

  const therapiesCuts = useWatch({ name: 'therapiesCuts' });

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
              <TherapiesCutForm
                getSource={getSource}
                choices={therapiesChoices}
                resetRequests={resetRequests}
                loading={therapiesLoading}
                requests={getTherapyRequests(scopedFormData.therapyId)}
                type={type}
              />
            );
          }}
        </FormDataConsumer>
      </SimpleFormIterator>
    </ArrayInput>
  );
}

TherapiesCutsSelect.propTypes = {
  getSource: PropTypes.func,
  resetRequests: PropTypes.func,
  choices: PropTypes.array,
  requests: PropTypes.array,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
  readOnly: PropTypes.bool,
};
