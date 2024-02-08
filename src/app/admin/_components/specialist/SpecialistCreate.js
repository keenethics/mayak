'use client';

import React, { useState } from 'react';
import {
  ArrayInput,
  BooleanInput,
  Create,
  FormDataConsumer,
  NumberInput,
  required,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  useGetList,
  useNotify,
  useRedirect,
} from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DISTRICT,
  FormatOfWork,
  FormMode,
  Gender,
  SPECIALIZATION,
  SuccessNotifications,
  THERAPY,
  Titles,
} from '@/app/admin/_lib/consts';
import { getChoicesList } from '@/app/admin/_utils/getChoicesList';
import {
  SpecialistCreateDraftSchema as draftSchema,
  SpecialistCreateSchema as baseSchema,
} from '@/lib/validationSchemas/specialistCreateSchema';
import { Toggle } from '@/app/admin/_components/shared/Toggle';
import { FormFieldWrapper } from '@/app/admin/_components/shared/FormFieldWrapper';
import { transformIdList } from '@/app/admin/_utils/transformIdList';
import {
  SpecialistCreateFormBlocks,
  SpecialistFormFields,
} from '@/app/admin/_lib/specialistData';

export const SpecialistCreate = () => {
  const [draft, setDraft] = useState(false);
  const notify = useNotify();
  const redirect = useRedirect();

  const formMode = draft ? FormMode.draft : FormMode.base;
  const validationSchema = draft ? draftSchema : baseSchema;

  const { data: therapies, isLoading: therapiesLoading } = useGetList(THERAPY);
  const { data: specializations, isLoading: specializationsLoading } = useGetList(SPECIALIZATION);
  const { data: districts, isLoading: districtsLoading } = useGetList(DISTRICT);

  const therapiesList = getChoicesList(therapies);
  const specializationsList = getChoicesList(specializations);
  const districtsList = getChoicesList(districts);

  const genderChoicesList = getChoicesList(Object.values(Gender));
  const formatOfWorkChoicesList = getChoicesList(Object.values(FormatOfWork));

  const handleSuccess = () => {
    notify(SuccessNotifications.created);
    redirect('/Specialist');
  };

  const handleError = (error) => {
    notify(error.message);
  };

  const toggleState = previousState => !previousState;

  function toggleFormMode() {
    setDraft(toggleState);
  }

  const transformPlacesOfWork = (placesArray) => {
    const mappedPlaces = placesArray.map((place) => {
      // eslint-disable-next-line no-param-reassign
      place.district = {
        connect: { id: place.district },
      };
      return place;
    });

    return [
      {
        addresses: {
          create: mappedPlaces.slice(),
        },
      },
    ];
  };

  const transformFormData = (data) => {
    if (draft) {
      return {
        ...data,
        specializations: {
          connect: transformIdList(data.specializations),
        },
      };
    }

    return {
      ...data,
      specializations: {
        connect: transformIdList(data.specializations),
      },
      placesOfWork: {
        create: transformPlacesOfWork(data.placesOfWork),
      },
      therapies: {
        connect: transformIdList(data.therapies),
      },
    };
  };

  const generateTextInputList = (inputList, ...props) => inputList.map(({
    name, type, label, validate,
  }) => (
    <TextInput
      key={name}
      name={name}
      source={name}
      type={type}
      label={label}
      validate={validate && required()}
      {...props}
    />
  ));

  const isOnline = format => format === FormatOfWork.online;

  return (
    <Create
      title={Titles.specialistCreate}
      transform={transformFormData}
      mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
    >
      <Toggle onChange={toggleFormMode} formMode={formMode} />
      <SimpleForm
        mode="onBlur"
        reValidateMode="onChange"
        resolver={zodResolver(validationSchema)}
        className="w-[800px]"
      >
        <FormFieldWrapper
          title={SpecialistCreateFormBlocks.general}
          className="mt-5"
        >
          <div className="flex w-full gap-6 [&>*]:flex-grow">
            {generateTextInputList(SpecialistFormFields.general)}
          </div>
          <SelectArrayInput
            name={SpecialistFormFields.specializations.name}
            source={SpecialistFormFields.specializations.name}
            label={SpecialistFormFields.specializations.label}
            isLoading={specializationsLoading}
            choices={specializationsList}
            validate={required()}
            fullWidth
          />
        </FormFieldWrapper>
        {!draft && (
          <>
            <FormFieldWrapper
              title={SpecialistCreateFormBlocks.details}
              className="mt-5"
            >
              <div className="flex w-full gap-6">
                <SelectInput
                  name={SpecialistFormFields.gender.name}
                  source={SpecialistFormFields.gender.name}
                  label={SpecialistFormFields.gender.label}
                  choices={genderChoicesList}
                  validate={required()}
                />
                <NumberInput
                  name={SpecialistFormFields.yearsOfExperience.name}
                  source={SpecialistFormFields.yearsOfExperience.name}
                  label={SpecialistFormFields.yearsOfExperience.label}
                  min="0"
                  validate={required()}
                />
                <SelectInput
                  name={SpecialistFormFields.formatOfWork.name}
                  source={SpecialistFormFields.formatOfWork.name}
                  label={SpecialistFormFields.formatOfWork.label}
                  choices={formatOfWorkChoicesList}
                  className="flex-1"
                  validate={required()}
                />
              </div>
            </FormFieldWrapper>
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
            <FormFieldWrapper title={SpecialistCreateFormBlocks.services}>
              <SelectArrayInput
                name={SpecialistFormFields.therapies.name}
                source={SpecialistFormFields.therapies.name}
                label={SpecialistFormFields.therapies.label}
                isLoading={therapiesLoading}
                choices={therapiesList}
                className="w-full"
                validate={required()}
              />
              <BooleanInput
                name={SpecialistFormFields.isFreeReception.name}
                source={SpecialistFormFields.isFreeReception.name}
                label={SpecialistFormFields.isFreeReception.label}
              />
              <TextInput
                name={SpecialistFormFields.description.name}
                source={SpecialistFormFields.description.name}
                label={SpecialistFormFields.isFreeReception.label}
                fullWidth
                multiline
              />
            </FormFieldWrapper>
            <FormFieldWrapper title={SpecialistCreateFormBlocks.contacts}>
              <div className="flex gap-4 [&>*]:flex-grow">
                {generateTextInputList(SpecialistFormFields.contacts)}
              </div>
            </FormFieldWrapper>
          </>
        )}
      </SimpleForm>
    </Create>
  );
};
