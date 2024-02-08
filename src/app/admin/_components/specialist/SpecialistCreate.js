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

const SpecialistCreate = () => {
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
        <FormFieldWrapper title="Основні данні:" className="mt-5">
          <div className="flex w-full gap-6 [&>*]:flex-grow">
            <TextInput
              name="lastName"
              source="lastName"
              label="Прізвище"
              validate={required()}
            />
            <TextInput
              name="firstName"
              source="firstName"
              label="Ім'я"
              validate={required()}
            />
            <TextInput name="surname" source="surname" label="По-батькові" />
          </div>
          <SelectArrayInput
            name="specializations"
            source="specializations"
            label="Спеціалізація"
            isLoading={specializationsLoading}
            choices={specializationsList}
            validate={required()}
            fullWidth
          />
        </FormFieldWrapper>
        {!draft && (
          <>
            <FormFieldWrapper title="Деталі:" className="mt-5">
              <div className="flex w-full gap-6">
                <SelectInput
                  name="gender"
                  source="gender"
                  label="Стать"
                  choices={genderChoicesList}
                  validate={required()}
                />
                <NumberInput
                  name="yearsOfExperience"
                  source="yearsOfExperience"
                  label="Роки стажу"
                  min="0"
                  validate={required()}
                />
                <SelectInput
                  name="formatOfWork"
                  source="formatOfWork"
                  label="Формат послуг"
                  choices={formatOfWorkChoicesList}
                  className="flex-1"
                  validate={required()}
                />
              </div>
            </FormFieldWrapper>

            <FormFieldWrapper title="Місце надання послуг:">
              <FormDataConsumer>
                {({ formData }) => (
                  <ArrayInput
                    name="placesOfWork"
                    source="placesOfWork"
                    label={
                      formData.formatOfWork === 'ONLINE'
                        ? 'Спеціаліст працює онлайн'
                        : 'Адреса'
                    }
                    fullWidth
                    disabled={formData.formatOfWork === 'ONLINE'}
                  >
                    <SimpleFormIterator inline>
                      <TextInput
                        fullWidth
                        source="fullAddress"
                        label="Повна адреса"
                        helperText="Вулиця, номер будинку, поверх, кабінет"
                        validate={required()}
                      />
                      <TextInput
                        source="nameOfClinic"
                        label="Назва клініки"
                        fullWidth
                      />
                      <SelectInput
                        source="district"
                        label="Район"
                        isLoading={districtsLoading}
                        choices={districtsList}
                        validate={required()}
                      />
                    </SimpleFormIterator>
                  </ArrayInput>
                )}
              </FormDataConsumer>
            </FormFieldWrapper>
            <FormFieldWrapper title="Послуги:">
              <SelectArrayInput
                name="therapies"
                source="therapies"
                label="Тип терапії"
                isLoading={therapiesLoading}
                choices={therapiesList}
                className="w-full"
                validate={required()}
              />
              <BooleanInput
                name="isFreeReception"
                label="Безкоштовний прийом"
                source="isFreeReception"
              />
              <TextInput
                name="description"
                source="description"
                label="Опис"
                fullWidth
                multiline
              />
            </FormFieldWrapper>
            <FormFieldWrapper title="Контактні данні:">
              <div className="flex gap-4 [&>*]:flex-grow">
                <TextInput
                  name="phone"
                  type="tel"
                  source="tel"
                  label="Телефон"
                  validate={required()}
                />
                <TextInput
                  name="email"
                  type="email"
                  source="email"
                  label="Пошта"
                />
                <TextInput
                  name="surname"
                  type="url"
                  source="website"
                  label="Веб сторінка"
                />
              </div>
            </FormFieldWrapper>
          </>
        )}
      </SimpleForm>
    </Create>
  );
};

export default SpecialistCreate;
