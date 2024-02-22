import { useWatch } from 'react-hook-form';
import { useGetList, SelectInput, TextInput, ArrayInput, SimpleFormIterator, Loading, required } from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';

export function AddressInput({ isActive }) {
  const format = useWatch({ name: 'formatOfWork' });
  const disabled = format === 'ONLINE' || !format;
  const { data: districts, isLoading } = useGetList(RESOURCES.district);
  if (isLoading) return <Loading />;
  return (
    <ArrayInput source="addresses" label="Адреси">
      <SimpleFormIterator inline disableReordering disableAdd={disabled}>
        <TextInput source="fullAddress" validate={isActive && required()} label="Повна адреса" />
        <SelectInput
          label="Район"
          source="district"
          validate={isActive && required()}
          choices={districts.map(district => ({ id: district.name, name: district.name }))}
        />
      </SimpleFormIterator>
    </ArrayInput>
  );
}
