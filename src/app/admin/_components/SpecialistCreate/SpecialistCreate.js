'use client';

import React, { useState } from 'react';
import {
  Create,
  NumberInput,
  required,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetList,
} from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormatOfWork, Gender } from '@/app/admin/_lib/consts';
import { getChoicesList } from '@/app/admin/_utils/getChoicesList';
import {
  SpecialistCreateDraftSchema as draftSchema,
  SpecialistCreateSchema as schema,
} from '@/app/admin/_components/SpecialistCreate/schema';

const SpecialistCreate = () => {
  const [draft, setDraft] = useState(false);
  const formMode = draft ? 'Чорнетка' : 'Повна анкета';
  const validationSchema = draft ? draftSchema : schema;

  function toggleFormMode() {
    setDraft(prevMode => !prevMode);
  }

  const { data: therapies } = useGetList('therapy');
  const { data: specializations } = useGetList('specialization');
  const therapiesList = getChoicesList(therapies);
  const specializationsList = getChoicesList(specializations);
  const genderChoicesList = getChoicesList(Object.values(Gender));
  const formatOfWorkChoicesList = getChoicesList(Object.values(FormatOfWork));

  const transform = (data) => {
    // console.log({
    //   ...init,
    //   ...data,
    // });

    const { firstName, lastName } = data;

    return {
      firstName,
      lastName,
      specializations: {
        connect: {
          id: '0f86eb23-a39d-4f69-8801-3a4588a81772',
        },
      },
      placesOfWork: {
        connect: {
          id: '01e8cb96-9871-4d9d-8483-fa830b6206fc',
        },
      },
      therapies: {
        connect: {
          id: '1461b40b-046d-431c-84bd-94a98b016cc0',
        },
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
        reValidateMode="onBlur"
        className="w-full bg-primary-200"
        resolver={zodResolver(validationSchema)}
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
              resettable
              className="w-full"
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
                  validate={required()}
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
                  validate={required()}
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
                resettable
                className="w-full"
              />
            </div>
          </>
        )}
      </SimpleForm>
    </Create>
  );
};

export default SpecialistCreate;
