'use client';

import React, { useState } from 'react';
import {
  BooleanInput,
  Create,
  NumberInput,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetList,
  useNotify,
  useRedirect,
} from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import {
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
import { transformIdList } from '@/app/admin/_utils/transformIdList';
import Toggle from '@/app/admin/_components/Toggle';
import FieldWrapper from '@/app/admin/_components/FieldWrapper';

const SpecialistCreate = () => {
  const [draft, setDraft] = useState(false);

  const notify = useNotify();
  const redirect = useRedirect();
  const onSuccess = () => {
    notify(SuccessNotifications.created);
    redirect('/Specialist');
  };

  const formMode = draft ? FormMode.draft : FormMode.base;
  const validationSchema = draft ? draftSchema : baseSchema;

  const toggleState = previousState => !previousState;

  function toggleFormMode() {
    setDraft(toggleState);
  }

  const { data: therapies } = useGetList(THERAPY);
  const { data: specializations } = useGetList(SPECIALIZATION);
  const therapiesList = getChoicesList(therapies);
  const specializationsList = getChoicesList(specializations);
  const genderChoicesList = getChoicesList(Object.values(Gender));
  const formatOfWorkChoicesList = getChoicesList(Object.values(FormatOfWork));

  const transform = (data) => {
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
        create: [
          {
            addresses: {
              createMany: {
                data: [
                  {
                    nameOfClinic: 'Clinic 1',
                    fullAddress: '123 Street, Building 1, Floor 2, Room 3',
                    district: {
                      connect: {
                        id: '3769b729-91b4-4b64-97d4-ad5c2e4f7bc1',
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      therapies: {
        connect: transformIdList(data.therapies),
      },
    };
  };

  return (
    <Create
      title={Titles.specialistCreate}
      transform={transform}
      mutationOptions={{ onSuccess }}
    >
      <Toggle onChange={toggleFormMode} formMode={formMode} />
      <SimpleForm
        mode="onBlur"
        reValidateMode="onChange"
        resolver={zodResolver(validationSchema)}
        sanitizeEmptyValues={true}
        className="w-[800px]"
      >
        <FieldWrapper title="Основні данні:" className="mt-5">
          <div className="flex w-full gap-4 [&>*]:flex-grow">
            <TextInput name="lastName" source="Прізвище" />
            <TextInput name="firstName" source="Ім'я" />
            <TextInput name="surname" source="По-батькові" />
          </div>
          <SelectArrayInput
            name="specializations"
            source="Спеціалізація"
            choices={specializationsList}
            fullWidth
          />
        </FieldWrapper>

        {!draft && (
          <>
            <FieldWrapper title="Деталі:" className="mt-5">
              <div className="flex w-full gap-8 [&>*]:flex-grow">
                <SelectInput
                  name="gender"
                  source="Стать"
                  choices={genderChoicesList}
                />
                <NumberInput
                  name="yearsOfExperience"
                  source="Роки стажу"
                  min="0"
                />
                <SelectInput
                  name="formatOfWork"
                  source="Формат послуг"
                  choices={formatOfWorkChoicesList}
                />
              </div>
            </FieldWrapper>
            <FieldWrapper title="Місце надання послуг:">
              <div className="mt-4 flex gap-2"></div>
            </FieldWrapper>
            <FieldWrapper title="Послуги:">
              <SelectArrayInput
                name="therapies"
                source="Тип терапії"
                choices={therapiesList}
                className="w-full"
              />
              <BooleanInput
                name="isFreeReception"
                label="Безкоштовний прийом"
                source="isFreeReception"
              />
              <TextInput
                name="description"
                source="description"
                fullWidth
                multiline
              />
            </FieldWrapper>
            <FieldWrapper title="Послуги:">
              <div className="flex gap-4 [&>*]:flex-grow">
                <TextInput name="phone" type="tel" source="Телефон" />
                <TextInput name="email" type="email" source="Пошта" />
                <TextInput name="surname" type="url" source="Веб сторінка" />
              </div>
            </FieldWrapper>
          </>
        )}
      </SimpleForm>
    </Create>
  );
};

export default SpecialistCreate;
