import {
  SelectInput,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  FormDataConsumer,
  useGetList,
  ReferenceInput,
  required,
} from 'react-admin';
import { FormatOfWork } from '@prisma/client';
import { RESOURCES } from '@admin/_lib/consts';
import PropTypes from 'prop-types';
import { FormFieldWrapper } from '../FormFieldWrapper';
import { districtPropType } from '@/app/(admin)/admin/_lib/specialistPropTypes';
import Loading from '@/app/loading';

function AddressForm({ getSource, districts, type, readOnly = false }) {
  return (
    <>
      <TextInput
        InputProps={{
          readOnly,
        }}
        fullWidth
        source={getSource('fullAddress')}
        label={'Повна адреса'}
        validate={required()}
        helperText="Вулиця, номер будинку, поверх, кабінет"
      />
      <TextInput
        InputProps={{
          readOnly,
        }}
        source={getSource('nameOfClinic')}
        label={'Назва клініки'}
        fullWidth
      />
      {type === 'create' && (
        <SelectInput
          InputProps={{
            readOnly,
          }}
          label="Район"
          source={getSource('district')}
          optionText={'name'}
          optionValue={'id'}
          validate={required()}
          choices={districts.map(district => ({ id: district.id, name: district.name }))}
        />
      )}
      {type === 'edit' && (
        <ReferenceInput source={getSource('districtId')} reference="District">
          <SelectInput
            InputProps={{
              readOnly,
            }}
            label="Район"
            optionText="name"
            optionValue="id"
            validate={required()}
          />
        </ReferenceInput>
      )}
    </>
  );
}

AddressForm.propTypes = {
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  districts: PropTypes.arrayOf(districtPropType),
  getSource: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['create', 'edit']),
  readOnly: PropTypes.bool,
};

export function AddressesForm({ type = 'create', label }) {
  const { data: districts, isLoading } = useGetList(RESOURCES.district);
  if (isLoading) return <Loading />;
  return (
    <FormFieldWrapper title={label} className="mt-3">
      <FormDataConsumer>
        {({ formData }) => {
          if (!formData) return null;
          const { formatOfWork } = formData;
          const onlineOnly = formatOfWork === FormatOfWork.ONLINE;
          const disabled = onlineOnly || !formatOfWork;
          return (
            <>
              {!formatOfWork && <p className="mb-6 text-gray-700">Оберіть формат роботи</p>}
              {onlineOnly && <p className="mb-6 text-gray-700">Спеціаліст працює тільки онлайн</p>}
              {!onlineOnly && (
                <ArrayInput source="addresses" label="">
                  <SimpleFormIterator inline disableReordering fullWidth disableAdd={disabled}>
                    <FormDataConsumer>
                      {({ scopedFormData, getSource }) => {
                        if (!scopedFormData) return null;
                        return scopedFormData.id ? (
                          <AddressForm getSource={getSource} readOnly type={type} districts={districts} />
                        ) : (
                          <AddressForm getSource={getSource} type={type} districts={districts} />
                        );
                      }}
                    </FormDataConsumer>
                  </SimpleFormIterator>
                </ArrayInput>
              )}
            </>
          );
        }}
      </FormDataConsumer>
    </FormFieldWrapper>
  );
}

AddressesForm.propTypes = {
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  type: PropTypes.oneOf(['create', 'edit']),
  label: PropTypes.string,
};
