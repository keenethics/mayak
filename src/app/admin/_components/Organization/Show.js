import React from 'react';

import {
  Show,
  SimpleShowLayout,
  BooleanField,
  TextField,
  ArrayField,
  Datagrid,
  NumberField,
  DateField,
  ChipField,
  SingleFieldList,
} from 'react-admin';

export function OrganizationShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <ArrayField label="Тип організації" source="type">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <TextField label="Назва" source="name" />
        <DateField label="Дата додавання в сервіс" showTime source="createdAt" />
        <NumberField label="Роки на ринку" source="yearsOnMarket" />
        <TextField label="Формат послуг" source="formatOfWork" />
        <ArrayField label="Адреси" source="addresses">
          <Datagrid bulkActionButtons={false}>
            <TextField label="Повна адреса" source="fullAddress" />
            <TextField label="Район" source="district.name" />
          </Datagrid>
        </ArrayField>
        <ArrayField label="Типи терапії" source="therapies">
          <SingleFieldList linkType={false}>
            <ChipField source="type" size="small" />
          </SingleFieldList>
        </ArrayField>
        <BooleanField label="Безкоштовний прийом" source="isFreeReception" />
        <BooleanField label="Активна/неактивна" source="isActive" />
        <TextField label="Опис" source="description" />
        <TextField label="Номер телефону" source="phone" />
        <TextField source="email" />
        <TextField label="Вебсайт" source="website" />
      </SimpleShowLayout>
    </Show>
  );
}
