import { useWatch } from 'react-hook-form';
import { SelectInput, TextInput, ArrayInput, SimpleFormIterator, required, useGetList, Loading } from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';
import PropTypes from 'prop-types';

export function AddressInput({ isActive }) {
  const format = useWatch({ name: 'formatOfWork' });
  const disabled = format === 'ONLINE' || !format;
  const { data: districts, isLoading } = useGetList(RESOURCES.district);
  if (isLoading) return <Loading />;
  return (
    <ArrayInput source="addresses" label="Адреси">
      <SimpleFormIterator inline disableReordering disableAdd={disabled}>
        <TextInput source="fullAddress" validate={isActive && required()} label="Повна адреса" />
        <TextInput source={'nameOfClinic'} label={'Назва клініки'} fullWidth />
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

AddressInput.propTypes = {
  isActive: PropTypes.bool,
};
