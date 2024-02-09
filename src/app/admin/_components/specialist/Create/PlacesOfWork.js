'use client';

import React from 'react';
import {
  ArrayInput,
  FormDataConsumer,
  SelectInput,
  SimpleFormIterator,
  TextInput,
  useGetList,
} from 'react-admin';
import { FormatOfWork } from '@prisma/client';
import { DISTRICT } from '@/app/admin/_lib/consts';
import { getChoicesList } from '@/app/admin/_utils/getChoicesList';
import { FormFieldWrapper } from '@/app/admin/_components/FormFieldWrapper';
import {
  SpecialistCreateFormBlocks,
  SpecialistFormFields,
} from '@/app/admin/_lib/specialistData';

const PlacesOfWork = () => {
  const { data: districts, isLoading: districtsLoading } = useGetList(DISTRICT);

  const districtsList = getChoicesList(districts);

  const isOnline = format => format === FormatOfWork.ONLINE;

  return (
    <FormFieldWrapper
      title={SpecialistCreateFormBlocks.placesOfWOrk}
      className="mt-3"
    >
      <FormDataConsumer>
        {({ formData }) => (isOnline(formData.formatOfWork) ? (
          <span className="text-caption text-gray-600">
              Спеціаліст працює онлайн
          </span>
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
