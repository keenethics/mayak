import {
  Create, TextInput, SimpleForm, DateTimeInput, SelectInput, NumberInput, Labeled, required,
} from 'react-admin';
import { useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateEventSchema } from '@/lib/validationSchemas/createEventSchema';

function PriceInput() {
  const priceType = useWatch({ name: 'priceType' });
  return <NumberInput disabled={priceType !== 'FIXED_PRICE' && priceType !== 'MIN_PRICE'} source="price" />;
}

function AddressInput() {
  const format = useWatch({ name: 'format' });
  return <TextInput disabled={format !== 'OFFLINE'} source="address" />;
}

function transformLink(data) {
  if (!data.additionalLink) return data;

  const linkObject = { label: data.additionalLink.label, link: data.additionalLink.link };

  return {
    ...data,
    additionalLink: {
      connectOrCreate: {
        where: { label_link: linkObject },
        create: linkObject,
      },
    },
  };
}

export function CreateEvent() {
  return (
    <Create transform={transformLink}>
      <SimpleForm resolver={zodResolver(CreateEventSchema)}>
        <TextInput source="eventName" validate={required()} />
        <TextInput source="organizerName" validate={required()} />
        <DateTimeInput source="eventDate" validate={required()} />
        <div className="flex flex-col md:flex-row md:gap-6">
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
        <div className="flex flex-col md:flex-row md:gap-6">
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
        <Labeled label="Additional link">
          <Create resource="EventLink" title="Additional link">
            <div className="m-3 flex flex-col">
              <TextInput source="additionalLink.label" label="Label" />
              <TextInput source="additionalLink.link" label="Link" />
            </div>
          </Create>
        </Labeled>
      </SimpleForm>
    </Create>
  );
}
