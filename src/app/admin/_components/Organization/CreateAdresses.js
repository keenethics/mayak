import { useWatch } from 'react-hook-form';
import { SelectInput, TextInput, ArrayInput, SimpleFormIterator, required } from 'react-admin';
import { DISTRICTS } from '@admin/_lib/consts';
import PropTypes from 'prop-types';

export function AddressInput({ isActive }) {
  const format = useWatch({ name: 'formatOfWork' });
  const disabled = format === 'ONLINE' || !format;
  return (
    <ArrayInput source="addresses" label="Адреси">
      <SimpleFormIterator inline disableReordering disableAdd={disabled}>
        <TextInput source="fullAddress" validate={isActive && required()} label="Повна адреса" />
        <SelectInput
          label="Район"
          source="district"
          validate={isActive && required()}
          choices={DISTRICTS.map(district => ({ id: district, name: district }))}
        />
      </SimpleFormIterator>
    </ArrayInput>
  );
}

AddressInput.propTypes = {
  isActive: PropTypes.bool,
};
