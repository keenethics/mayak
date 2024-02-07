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
} from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormatOfWork,
  FormMode,
  Gender,
  SPECIALIZATION,
  THERAPY,
} from '@/app/admin/_lib/consts';
import { getChoicesList } from '@/app/admin/_utils/getChoicesList';
import {
  SpecialistCreateDraftSchema as draftSchema,
  SpecialistCreateSchema as baseSchema,
} from '@/lib/validationSchemas/specialistCreateSchema';
import { transformIdList } from '@/app/admin/_utils/transformIdList';

// const BooleanInputCustom = (props) => {
//   const { formState } = useFormContext();
//
//   return <BooleanInput {...props} disabled={!formState.isValid} />;
// };

const SpecialistCreate = () => {
  const [draft, setDraft] = useState(false);
  // const [isActive, setIsActive] = useState(false);
  const formMode = draft ? FormMode.draft : FormMode.base;
  const validationSchema = draft ? draftSchema : baseSchema;

  const toggleState = previousState => !previousState;

  function toggleFormMode() {
    setDraft(toggleState);
  }

  // function toggleIsActive() {
  //   setIsActive(toggleState);
  // }

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
    <Create title="Adding new specialist/organization" transform={transform}>
      <div className="m-4">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            onChange={toggleFormMode}
            className="peer sr-only"
          />
          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-other-white after:transition-all after:content-[''] peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-other-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-400 rtl:peer-checked:after:-translate-x-full dark:border-gray-800 dark:bg-gray-900 dark:peer-focus:ring-primary-800"></div>
          <span className="text-sm ms-3 font-medium text-gray-900 dark:text-gray-300">
            <p className="font-bold text-primary-700">{formMode}</p>
          </span>
        </label>
      </div>

      <SimpleForm
        mode="onBlur"
        reValidateMode="onChange"
        resolver={zodResolver(validationSchema)}
        sanitizeEmptyValues={true}
        className="w-full"
      >
        <div>
          <p className="text-p1 font-bold text-primary-700">Основні данні:</p>
          <div className="mt-2">
            <div className="flex gap-4">
              <TextInput name="lastName" source="Прізвище" />
              <TextInput name="firstName" source="Ім'я" />
              <TextInput name="surname" source="По-батькові" />
            </div>
            <SelectArrayInput
              name="specializations"
              source="Спеціалізація"
              choices={specializationsList}
            />
          </div>
        </div>

        {!draft && (
          <>
            <div className="mt-5">
              <p className="text-p1 font-bold text-primary-700">Деталі:</p>
              <div className="mt-4 flex gap-2">
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
            </div>
            <div className="mt-5">
              <p className="text-p1 font-bold text-primary-700">
                Місце надання послуг:
              </p>
              <div className="mt-4 flex gap-2"></div>
            </div>
            <div className="mt-5 w-full">
              <p className="text-p1 font-bold text-primary-700">Послуги:</p>
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
            </div>
            <div className="mt-5">
              <p className="text-p1 font-bold text-primary-700">
                Контактна інформація:
              </p>
              <div className="mt-4 flex gap-2">
                <div className="flex gap-4">
                  <TextInput name="phone" type="tel" source="Телефон" />
                  <TextInput name="email" type="email" source="Пошта" />
                  <TextInput name="surname" type="url" source="Веб сторінка" />
                </div>
              </div>
            </div>
            {/* <BooleanInputCustom */}
            {/*  name="isActive" */}
            {/*  label="Активувати" */}
            {/*  source="isActive" */}
            {/*  onChange={toggleIsActive} */}
            {/* /> */}
          </>
        )}
      </SimpleForm>
    </Create>
  );
};

export default SpecialistCreate;
