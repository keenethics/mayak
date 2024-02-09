'use client';

import React from 'react';
import {
  ArrayInput,
  FormDataConsumer,
  required,
  SelectInput,
  SimpleFormIterator,
  TextInput,
  useGetList,
} from 'react-admin';
import { DISTRICT, FormatOfWork } from '@/app/admin/_lib/consts';
import { getChoicesList } from '@/app/admin/_utils/getChoicesList';
import { FormFieldWrapper } from '@/app/admin/_components/shared/FormFieldWrapper';
import {
  SpecialistCreateFormBlocks,
  SpecialistFormFields,
} from '@/app/admin/_lib/specialistData';

const SpecialistCreatePlacesOfWork = () => {
  const { data: districts, isLoading: districtsLoading } = useGetList(DISTRICT);

  const districtsList = getChoicesList(districts);

  const isOnline = format => format === FormatOfWork.online;

  return (
    <FormFieldWrapper title={SpecialistCreateFormBlocks.placesOfWOrk}>
      <FormDataConsumer>
        {({ formData }) => (isOnline(formData.formatOfWork) ? (
          <p className="text-caption text-gray-600">
              Спеціаліст працює онлайн
          </p>
        ) : (
          <ArrayInput
            name={SpecialistFormFields.placesOfWork.name}
            source={SpecialistFormFields.placesOfWork.name}
            label={SpecialistFormFields.placesOfWork.label}
            fullWidth
          >
            <SimpleFormIterator inline>
              <TextInput
                fullWidth
                source={SpecialistFormFields.fullAddress.name}
                label={SpecialistFormFields.fullAddress.label}
                helperText="Вулиця, номер будинку, поверх, кабінет"
                validate={!isOnline && required()}
              />
              <TextInput
                source={SpecialistFormFields.nameOfClinic.name}
                label={SpecialistFormFields.nameOfClinic.label}
                fullWidth
              />
              <SelectInput
                source={SpecialistFormFields.district.name}
                label={SpecialistFormFields.district.label}
                isLoading={districtsLoading}
                choices={districtsList}
                validate={required()}
              />
            </SimpleFormIterator>
          </ArrayInput>
        ))
        }
      </FormDataConsumer>
    </FormFieldWrapper>
  );
};

export { SpecialistCreatePlacesOfWork };
