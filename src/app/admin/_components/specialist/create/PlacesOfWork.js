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
import { FormatOfWork } from '@prisma/client';
import { RESOURCES } from '@/app/admin/_lib/consts';
import { FormFieldWrapper } from '@/app/admin/_components/FormFieldWrapper';
import { SpecialistFormFields, SpecialistFormSections } from '@/app/admin/_lib/specialistData';

export function PlacesOfWork() {
  const { data: districtsList, isLoading: districtsLoading } = useGetList(RESOURCES.district);

  const { placesOfWork, fullAddress, nameOfClinic, district } = SpecialistFormFields;

  const isOnline = format => format === FormatOfWork.ONLINE;

  const placesOfWorkLabel = format => (isOnline(format) ? 'Спеціаліст працює онлайн' : placesOfWork.label);

  return (
    <FormFieldWrapper title={SpecialistFormSections.placesOfWOrk} className="mt-3">
      <FormDataConsumer>
        {({ formData }) => (
          <ArrayInput
            name={placesOfWork.name}
            source={placesOfWork.name}
            label={placesOfWorkLabel(formData.formatOfWork)}
            validate={!isOnline(formData.formatOfWork) && placesOfWork.isRequired && required()}
            fullWidth
            disabled={isOnline(formData.formatOfWork)}
          >
            <SimpleFormIterator inline fullWidth>
              <TextInput
                fullWidth
                source={fullAddress.name}
                label={fullAddress.label}
                validate={fullAddress.isRequired && required()}
                helperText="Вулиця, номер будинку, поверх, кабінет"
              />
              <TextInput
                source={nameOfClinic.name}
                label={nameOfClinic.label}
                validate={nameOfClinic.isRequired && required()}
                fullWidth
              />
              <SelectInput
                source={district.name}
                label={district.label}
                isLoading={districtsLoading}
                choices={districtsList}
                validate={district.isRequired && required()}
              />
            </SimpleFormIterator>
          </ArrayInput>
        )}
      </FormDataConsumer>
    </FormFieldWrapper>
  );
}
