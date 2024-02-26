import { useWatch } from 'react-hook-form';
import {
  SelectInput,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  required,
  FormDataConsumer,
  BooleanInput,
  useGetList,
  Loading,
} from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';
import PropTypes from 'prop-types';

export function AddressInput({ isActive }) {
  const format = useWatch({ name: 'formatOfWork' });
  const disabled = format === 'ONLINE' || !format;
  const { data: districts, isLoading } = useGetList(RESOURCES.district);
  if (isLoading) return <Loading />;
  return (
    <FormDataConsumer>
      {({ formData }) => (
        <ArrayInput source="addresses" label="Адреси">
          <SimpleFormIterator inline disableReordering disableAdd={disabled}>
            <BooleanInput
              fullWidth
              source={'isPrimary'}
              label="Головна адреса"
              defaultValue={formData?.addresses?.length === 0}
              className="mt-8"
            />
            <TextInput source="fullAddress" validate={isActive && required()} label="Повна адреса" />
            <SelectInput
              label="Район"
              source="district"
              validate={isActive && required()}
              choices={districts.map(district => ({ id: district.name, name: district.name }))}
            />
          </SimpleFormIterator>
        </ArrayInput>
      )}
    </FormDataConsumer>
  );
}

AddressInput.propTypes = {
  isActive: PropTypes.bool,
};
