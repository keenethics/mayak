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
import { RESOURCES } from '@admin/_lib/consts';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { SpecialistFormFields, SpecialistFormSections } from '@admin/_lib/specialistData';

export function PlacesOfWork() {
  const { data: districtsList, isLoading: districtsLoading } = useGetList(RESOURCES.district);

  const { placesOfWork, fullAddress, nameOfClinic, district } = SpecialistFormFields;

  const isOnline = format => format === FormatOfWork.ONLINE;

  return (
    <FormFieldWrapper title={SpecialistFormSections.placesOfWOrk} className="mt-3">
      <FormDataConsumer>
        {({ formData }) =>
          isOnline(formData.formatOfWork) ? (
            <p className="mb-6 text-gray-700">Спеціаліст працює онлайн</p>
          ) : (
            <ArrayInput name={placesOfWork.name} source={placesOfWork.name} label={placesOfWork.label} fullWidth>
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
          )
        }
      </FormDataConsumer>
    </FormFieldWrapper>
  );
}
