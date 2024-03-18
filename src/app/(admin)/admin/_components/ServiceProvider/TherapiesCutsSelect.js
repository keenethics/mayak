'use client';

import {
  ArrayInput,
  AutocompleteArrayInput,
  AutocompleteInput,
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

function TherapiesCutFormEdit({ getSource, therapiesCuts, loading }) {
  const { setValue } = useFormContext();
  if (!therapiesCuts) return null;

  const selectedTherapies = therapiesCuts.map(cut => cut.therapy && cut.therapy.id).filter(Boolean);

  return (
    <>
      <ReferenceInput
        source={getSource('therapy.id')}
        filter={{ id: { notIn: selectedTherapies } }}
        reference="Therapy"
        validate={required()}
        fullWidth
      >
        <AutocompleteInput
          isLoading={loading}
          optionText="title"
          optionValue="id"
          onChange={(_, record) => {
            const curTherapyData = getSource('therapy.id');
            const index = Number(curTherapyData.split('.')[1]); // therapiesCuts.[index].therapyId
            const newCuts = therapiesCuts.map((cut, i) => {
              if (i !== index) {
                return cut;
              }

              return { ...cut, therapy: record, requests: [], requestsIds: [] };
            });
            // therapiesCuts[index] = { ...cut, therapy: record, requests: [], requestsIds: [] };
            setValue('therapiesCuts', newCuts);
          }}
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
  );
}

TherapiesCutFormEdit.propTypes = {
  getSource: PropTypes.func,
  therapiesCuts: PropTypes.array,
  loading: PropTypes.bool,
};

function TherapiesCutFormCreate({ getSource, resetRequests, choices, requests, loading }) {
  return (
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
  );
}

TherapiesCutFormCreate.propTypes = {
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
        therapiesCuts[index] = { therapyId: newId, requests: [], requestsIds: [] };
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
          {({ scopedFormData, formData, getSource }) => {
            if (!scopedFormData || !formData) return null;
            // console.log({ formData });
            return (
              <>
                {type === 'create' && (
                  <TherapiesCutFormCreate
                    getSource={getSource}
                    choices={therapiesChoices}
                    therapiesCuts={therapiesCuts}
                    resetRequests={resetRequests}
                    loading={therapiesLoading}
                    requests={getTherapyRequests(scopedFormData.therapyId)}
                    type={type}
                  />
                )}
                {type === 'edit' && (
                  <TherapiesCutFormEdit
                    getSource={getSource}
                    choices={therapiesChoices}
                    therapiesCuts={therapiesCuts}
                    resetRequests={resetRequests}
                    loading={therapiesLoading}
                    requests={getTherapyRequests(scopedFormData.therapyId)}
                    type={type}
                  />
                )}
              </>
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
