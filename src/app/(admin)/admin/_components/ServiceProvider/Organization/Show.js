import React from 'react';

import {
  ArrayField,
  BooleanField,
  ChipField,
  Datagrid,
  DateField,
  NumberField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  FunctionField,
} from 'react-admin';

export function OrganizationShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <ArrayField label="Спеціалізації спеціалістів" source="expertSpecializations">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <ArrayField label="Тип організації" source="type">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <BooleanField label="Інклюзівний простір" source="isInclusiveSpace" />
        <TextField label="Тип власності" source="ownershipType" />
        <DateField label="Дата додавання в сервіс" showTime source="createdAt" />
        <NumberField label="Роки на ринку" source="yearsOnMarket" />
        <TextField label="Формат послуг" source="formatOfWork" />
        <ArrayField label="Адреси" source="addresses">
          <Datagrid bulkActionButtons={false}>
            <TextField label="Повна адреса" source="fullAddress" />
            <TextField label="Назва кліники" source="nameOfClinic" />
            <TextField label="Район" source="district.name" />
            <BooleanField label="Головна адреса" source="isPrimary" />
          </Datagrid>
        </ArrayField>
        <ArrayField label="Типи терапій" source="supportFocuses">
          <Datagrid bulkActionButtons={false}>
            <TextField label="Тип" source="therapy.title" />
            <TextField label="Ціна" source="price" />
            <ArrayField label="Запити" source="requests">
              <SingleFieldList linkType={false} className="p-3">
                <ChipField source="name" size="small" />
              </SingleFieldList>
            </ArrayField>
          </Datagrid>
        </ArrayField>
        <FunctionField
          label="Типи терапії"
          render={({ therapies, therapyPrices }) => (
            <div className="flex max-w-[600px] flex-col *:border-b-[1px]">
              <div className="flex justify-between p-3">
                <p>Тип терапії</p> <p>Ціна</p>
              </div>
              {therapies?.map(therapy => {
                const therapyPrice = therapyPrices?.find(el => el.therapy.id === therapy.id);
                return (
                  <div key={therapy.id} className="flex justify-between px-3 py-2">
                    <p>{therapy.title}</p>
                    <p>{therapyPrice ? `Ціна від ${therapyPrice.price} грн / год.` : 'Не зазначено'}</p>
                  </div>
                );
              })}
            </div>
          )}
        />
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
