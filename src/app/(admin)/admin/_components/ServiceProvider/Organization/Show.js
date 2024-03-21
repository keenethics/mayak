import React from 'react';

import {
  ArrayField,
  BooleanField,
  ChipField,
  Datagrid,
  DateField,
  FunctionField,
  NumberField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
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
        <ArrayField label="Місця надання послуг" source="addresses">
          <Datagrid bulkActionButtons={false}>
            <TextField label="Повна адреса" source="fullAddress" />
            <TextField label="Назва кліники" source="nameOfClinic" />
            <TextField label="Район" source="district.name" />
            <BooleanField label="Головна адреса" source="isPrimary" />
            <FunctionField
              source="location"
              render={record => (
                <a
                  className="text-primary-500"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.google.com/maps/search/?api=1&query=${record.latitude},${record.longitude}`}
                >
                  Локація на Google карті
                </a>
              )}
              label="На карті"
            />
          </Datagrid>
        </ArrayField>
        <ArrayField label="Типи терапії" source="therapies">
          <SingleFieldList linkType={false}>
            <ChipField source="title" size="small" />
          </SingleFieldList>
        </ArrayField>
        <BooleanField label="Безкоштовний прийом" source="isFreeReception" />
        <BooleanField label="Активна/неактивна" source="isActive" />
        <TextField label="Опис" source="description" />
        <TextField label="Номер телефону" source="phone" />
        <TextField source="email" />
        <TextField label="Вебсайт" source="website" />
        <TextField label="Instagram" source="instagram" />
        <TextField label="Facebook" source="facebook" />
        <TextField label="YouTube" source="youtube" />
        <TextField label="LinkedIn" source="linkedin" />
        <TextField label="TikTok" source="tiktok" />
        <TextField label="Viber" source="viber" />
        <TextField label="Telegram" source="telegram" />
      </SimpleShowLayout>
    </Show>
  );
}
