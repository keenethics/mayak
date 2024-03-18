'use client';

import {
  ArrayInput,
  AutocompleteArrayInput,
  AutocompleteInput,
  FormDataConsumer,
  ReferenceArrayInput,
  ReferenceInput,
  SimpleFormIterator,
  required,
  useGetList,
} from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';
import { useFormContext, useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { therapyPropType } from '@admin/_lib/specialistPropTypes';

function TherapiesCutsForm({ getSource, therapiesCuts, selectedTherapies, requestsIds, loading }) {
  const { setValue } = useFormContext();

  const therapySource = getSource('therapy.id');
  const therapyIndex = Number(therapySource.split('.')[1]);
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
          label="Тип терапії"
          validate={required()}
          onChange={(_, record) => {
            const newCuts = therapiesCuts.map((cut, i) => {
              if (i !== therapyIndex) {
                return cut;
              }

              return { ...cut, therapy: record, requestsIds: [] };
            });
            setValue('therapiesCuts', newCuts);
          }}
          fullWidth
        />
      </ReferenceInput>
      <ReferenceArrayInput
        source={getSource('requestsIds')}
        reference="Request"
        filter={{ id: { in: requestsIds } }}
        sort={{ field: 'name', order: 'ASC' }}
      >
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

TherapiesCutsForm.propTypes = {
  getSource: PropTypes.func,
  therapiesCuts: therapyPropType,
  selectedTherapies: PropTypes.arrayOf(PropTypes.string),
  requestsIds: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
};

export function TherapiesCutsSelect() {
  const { data: therapiesList, isLoading: therapiesLoading } = useGetList(RESOURCES.therapy);

  const therapiesCuts = useWatch({ name: 'therapiesCuts' });

  const selectedTherapiesIds = therapiesCuts?.map(cut => cut.therapy && cut.therapy.id).filter(Boolean) ?? [];

  const therapyRequestsIds = useCallback(
    therapyId => therapiesList.find(therapy => therapy.id === therapyId)?.requests.map(request => request.id) || [],
    [therapiesList],
  );

  return (
    <ArrayInput source="therapiesCuts" isLoading={therapiesLoading} label="Типи терапій">
      <SimpleFormIterator fullWidth disableReordering={true}>
        <FormDataConsumer>
          {({ scopedFormData, formData, getSource }) => {
            if (!scopedFormData || !formData) return null;
            return (
              <TherapiesCutsForm
                getSource={getSource}
                therapiesCuts={therapiesCuts}
                selectedTherapies={selectedTherapiesIds}
                requestsIds={therapyRequestsIds(scopedFormData?.therapy?.id || '')}
                loading={therapiesLoading}
              />
            );
          }}
        </FormDataConsumer>
      </SimpleFormIterator>
    </ArrayInput>
  );
}
