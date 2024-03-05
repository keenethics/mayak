import React from 'react';

import {
  Show,
  SimpleShowLayout,
  BooleanField,
  TextField,
  NumberField,
  ArrayField,
  SingleFieldList,
  ChipField,
  Datagrid,
  DateField,
} from 'react-admin';

export function SpecialistShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <ArrayField label="Спеціалізації" source="specializations">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <TextField label="Ім'я" source="firstName" />
        <TextField label="Прізвище" source="lastName" />
        <TextField label="По-батькові" source="surname" />
        <TextField label="Стать" source="gender" />
        <DateField showTime label="Дата додавання у сервіс" source="createdAt" />
        <NumberField label="Роки стажу" source="yearsOfExperience" />
        <TextField label="Формат роботи" source="formatOfWork" />
        <ArrayField label="Місця надання послуг" source="addresses">
          <Datagrid bulkActionButtons={false}>
            <TextField label="Повна адреса" source="fullAddress" />
            <TextField label="Назва кліники" source="nameOfClinic" />
            <TextField label="Район" source="district.name" />
          </Datagrid>
        </ArrayField>
        <ArrayField label="Типи терапії" source="therapies">
          <SingleFieldList linkType={false}>
            <ChipField source="type" size="small" />
          </SingleFieldList>
        </ArrayField>
        <BooleanField label="Безкоштовний прийом" source="isFreeReception" />
        <BooleanField label="Активний/Неактивний" source="isActive" />
        <TextField label="Опис" source="description" />
        <TextField label="Номер телефону" source="phone" />
        <TextField source="email" />
        <TextField label="Вебсайт" source="website" />
      </SimpleShowLayout>
    </Show>
  );
}
