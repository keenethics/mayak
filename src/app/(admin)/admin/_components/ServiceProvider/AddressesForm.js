import { useWatch } from 'react-hook-form';
import {
  SelectInput,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  required,
  useGetList,
  Loading,
  FormDataConsumer,
} from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';
import PropTypes from 'prop-types';
import { FormFieldWrapper } from '../FormFieldWrapper';
import { districtPropType } from '@/lib/specialistPropTypes';

function AddressForm({ isActive, districts, disabled }) {
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

AddressForm.propTypes = {
  isActive: PropTypes.bool,
  districts: PropTypes.arrayOf(districtPropType),
  disabled: PropTypes.bool,
};

export function AddressesForm({ isActive }) {
  const format = useWatch({ name: 'formatOfWork' });
  const disabled = format === 'ONLINE' || !format;
  const { data: districts, isLoading } = useGetList(RESOURCES.district);
  if (isLoading) return <Loading />;
  return (
    <FormFieldWrapper title={'Адреси надання послуг'} className="mt-3">
      <FormDataConsumer>
        {() =>
          disabled ? (
            <p className="mb-6 text-gray-700">Спеціаліст працює онлайн</p>
          ) : (
            <AddressForm isActive={isActive} districts={districts} disabled={disabled} />
          )
        }
      </FormDataConsumer>
    </FormFieldWrapper>
  );
}

AddressesForm.propTypes = {
  isActive: PropTypes.bool,
};
