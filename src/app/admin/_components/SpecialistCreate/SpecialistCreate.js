'use client';

import React, { useState } from 'react';
import {
  BooleanField,
  Create,
  NumberInput,
  required,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

// const specializationList = [
//   'Психологічний консультант',
//   'Психотерапевт',
//   'Психіатр',
//   'Сексолог',
//   'Соціальний працівник',
// ];

const specializationList = [
  {
    id: 1,
    name: 'Психологічний консультант',
  },
  {
    id: 2,
    name: 'Психотерапевт',
  },
  {
    id: 3,
    name: 'Психіатр',
  },
  {
    id: 4,
    name: 'Сексолог',
  },
  {
    id: 5,
    name: 'Соціальний працівник',
  },
];

const gender = [
  {
    id: 1,
    name: 'Male',
  },
  {
    id: 2,
    name: 'Female',
  },
];

const serviceType = [
  {
    id: 1,
    name: 'Online',
  },
  {
    id: 2,
    name: 'Offline',
  },
  {
    id: 3,
    name: 'Both',
  },
];

const SpecialistCreate = (props) => {
  const [draft, setDraft] = useState(false);

  // const isRequired = draft ? null : required();
  const formMode = draft ? 'Чорнетка' : 'Повна анкета';

  function toggleFormMode() {
    setDraft(prevMode => !prevMode);
  }

  return (
    <Create {...props} title="Add a new specialist/organization">
      <div className="m-4">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            value={draft}
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
      >
        <div>
          <p className="text-p1 font-bold text-primary-700">Основні данні:</p>
          <div className="mt-2">
            <div className="flex gap-4">
              <TextInput
                name="lastName"
                source="Прізвище"
                validate={required()}
              />
              <TextInput name="firstName" source="Ім'я" validate={required()} />
              <TextInput name="middleName" source="По-батькові" />
            </div>
            <SelectArrayInput
              source="Спеціалізація"
              choices={specializationList}
              validate={required()}
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
                  source="Стать"
                  choices={gender}
                  validate={required()}
                />
                <SelectInput
                  source="Формат послуг"
                  choices={serviceType}
                  validate={required()}
                />
                <NumberInput
                  name="years_of_experience"
                  source="Роки стажу"
                  min="0"
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
                source="Тип терапії"
                choices={specializationList}
                validate={required()}
                resettable
                className="w-full"
              />
              <div>
                <NumberInput name="price" source="Ціна" min="0" />
              </div>
              <BooleanField souce="Безкоштовний прийом" />
            </div>
          </>
        )}
      </SimpleForm>
    </Create>
  );
};

export default SpecialistCreate;
