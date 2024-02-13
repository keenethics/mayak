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
import { SpecialistFormBlocks, SpecialistFormFields } from '@/app/admin/_lib/specialistData';

const PlacesOfWork = () => {
  const { data: districtsList, isLoading: districtsLoading } = useGetList(RESOURCES.district);

  const {
    placesOfWork, fullAddress, nameOfClinic, district,
  } = SpecialistFormFields;

  const isOnline = format => format === FormatOfWork.ONLINE;

  return (
    <FormFieldWrapper title={SpecialistFormBlocks.placesOfWOrk} className="mt-3">
      <FormDataConsumer>
        {({ formData }) => (isOnline(formData.formatOfWork) ? (
          <span className="text-caption text-gray-600">Спеціаліст працює онлайн</span>
        ) : (
          <ArrayInput
            name={placesOfWork.name}
            source={placesOfWork.name}
            label={placesOfWork.label}
            validate={placesOfWork.validate && required()}
            fullWidth
          >
            <SimpleFormIterator inline>
              <TextInput
                fullWidth
                source={fullAddress.name}
                label={fullAddress.label}
                validate={fullAddress.validate && required()}
                helperText="Вулиця, номер будинку, поверх, кабінет"
              />
              <TextInput
                source={nameOfClinic.name}
                label={nameOfClinic.label}
                validate={nameOfClinic.validate && required()}
                fullWidth
              />
              <SelectInput
                source={district.name}
                label={district.label}
                isLoading={districtsLoading}
                choices={districtsList}
                validate={district.validate && required()}
              />
            </SimpleFormIterator>
          </ArrayInput>
        ))
        }
      </FormDataConsumer>
    </FormFieldWrapper>
  );
};

export { PlacesOfWork };
