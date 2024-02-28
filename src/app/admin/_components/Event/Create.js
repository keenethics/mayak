import { Create, TextInput, SimpleForm, DateTimeInput, SelectInput, NumberInput, required } from 'react-admin';
import { useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { CreateEventSchema } from '@admin/_lib/validationSchemas/createEventSchema';
import { transformEventData } from '@admin/_utils/transformEventData';
import { EventFormat, EventPriceFormat } from '@prisma/client';
import { TagSelect } from './TagSelect';

const fieldGroupClass = 'flex flex-col md:flex-row md:gap-6';

function PriceInput() {
  const priceType = useWatch({ name: 'priceType' });
  return (
    <>
      <span className="self-center">{priceType === EventPriceFormat.MIN_PRICE && 'від'}</span>
      <NumberInput disabled={priceType === EventPriceFormat.FREE} label="Вартість" source="price" />
    </>
  );
}

function AddressInput() {
  const format = useWatch({ name: 'format' });
  return (
    <>
      <TextInput
        disabled={format !== EventFormat.OFFLINE}
        source="address"
        label="Адреса чи назва приміщення"
        className="w-96"
      />
      <TextInput
        disabled={format !== EventFormat.OFFLINE}
        source="locationLink"
        label="Посилання на локацію"
        className="w-96"
      />
    </>
  );
}

export function EventCreate() {
  const [selectedTags, setSelectedTags] = useState(null);

  return (
    <Create transform={data => transformEventData(data, selectedTags)}>
      <SimpleForm resolver={zodResolver(CreateEventSchema)}>
        <p className="font-bold">Основна інформація</p>
        <TextInput source="title" label="Назва події" validate={required()} className="w-72" />
        <TextInput source="organizerName" label="Ім'я організатора" validate={required()} className="w-72" />
        <TextInput className="mt-32 w-96" source="notes" label="Коментарі" multiline />
        <DateTimeInput source="eventDate" label="Дата події" validate={required()} />
        <p className="font-bold">Вартість</p>
        <div className={fieldGroupClass}>
          <SelectInput
            source="priceType"
            choices={[
              { id: EventPriceFormat.FREE, name: 'Безкоштовно' },
              { id: EventPriceFormat.FIXED_PRICE, name: 'Фіксована вартість' },
              { id: EventPriceFormat.MIN_PRICE, name: 'Мінімальна вартість' },
            ]}
            label="Варіанти"
            validate={required()}
          />
          <PriceInput />
        </div>
        <p className="font-bold">Формат та локація</p>
        <div className={fieldGroupClass}>
          <SelectInput
            source="format"
            choices={[
              { id: EventFormat.OFFLINE, name: 'Офлайн' },
              { id: EventFormat.ONLINE, name: 'Онлайн' },
            ]}
            label="Формат події"
            validate={required()}
          />
          <AddressInput />
        </div>
        <p className="font-bold">Теги події</p>
        <TagSelect setSelectedTags={setSelectedTags} />
        <p className="mt-6 font-bold">
          Додаткове посилання(У поле тип введіть що це за посилання: телеграм, вебсайт тощо)
        </p>
        <div className={fieldGroupClass}>
          <TextInput source="additionalLink.label" label="Тип" />
          <TextInput source="additionalLink.link" label="Посилання" fullWidth />
        </div>
      </SimpleForm>
    </Create>
  );
}
