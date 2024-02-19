import {
  Create, TextInput, SimpleForm, DateTimeInput, SelectInput, NumberInput, required,
} from 'react-admin';
import { useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { CreateEventSchema } from '@/lib/validationSchemas/createEventSchema';
import { Tag } from './Tag';
import { transformEventData } from '@/app/admin/_utils/transformEventData';

const fieldGroupClass = 'flex flex-col md:flex-row md:gap-6';

function PriceInput() {
  const priceType = useWatch({ name: 'priceType' });
  return <NumberInput disabled={priceType !== 'FIXED_PRICE' && priceType !== 'MIN_PRICE'} source="price" />;
}

function AddressInput() {
  const format = useWatch({ name: 'format' });
  return (
    <>
      <TextInput disabled={format !== 'OFFLINE'} source="address" className="w-96" />
      <TextInput disabled={format !== 'OFFLINE'} source="locationLink" className="w-96" />
    </>
  );
}

export function CreateEvent() {
  const [selectedTags, setSelectedTags] = useState(null);

  return (
    <Create transform={data => transformEventData(data, selectedTags)}>
      <SimpleForm resolver={zodResolver(CreateEventSchema)}>
        <p>Main info</p>
        <TextInput source="eventName" validate={required()} className="w-72" />
        <TextInput source="organizerName" validate={required()} className="w-72" />
        <DateTimeInput source="eventDate" validate={required()} />
        <p>Format and location</p>
        <div className={fieldGroupClass}>
          <SelectInput
            source="format"
            choices={[
              { id: 'OFFLINE', name: 'Offline' },
              { id: 'ONLINE', name: 'Online' },
            ]}
            validate={required()}
          />
          <AddressInput />
        </div>
        <p>Pricing</p>
        <div className={fieldGroupClass}>
          <SelectInput
            source="priceType"
            choices={[
              { id: 'FREE', name: 'Free' },
              { id: 'FIXED_PRICE', name: 'Fixed price' },
              { id: 'MIN_PRICE', name: 'Minimum price' },
            ]}
            validate={required()}
          />
          <PriceInput />
        </div>
        <p>Notes for admin</p>
        <TextInput className="mt-32 w-96" source="notes" multiline />
        <p>Event tags</p>
        <Tag setSelectedTags={setSelectedTags} />
        <p className="mt-6">Additional link(Label is for link type(Telegram, Website, etc.))</p>
        <div className={fieldGroupClass}>
          <TextInput source="additionalLink.label" label="Label" />
          <TextInput source="additionalLink.link" label="Link" fullWidth />
        </div>
      </SimpleForm>
    </Create>
  );
}
