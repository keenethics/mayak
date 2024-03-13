import PropTypes from 'prop-types';
import { AutocompleteArrayInput, ReferenceArrayInput, SelectArrayInput, required, useGetList } from 'react-admin';
import { FORM_TYPES, RESOURCES } from '../../../_lib/consts';

export function SpecializationsSelect({ type = FORM_TYPES.create, label, ...props }) {
  const { data: specializationsList, isLoading: specializationsLoading } = useGetList(RESOURCES.specialization);

  return (
    <>
      {type === FORM_TYPES.create ? (
        <SelectArrayInput
          name="specializations"
          source="specializations"
          label={label}
          isLoading={specializationsLoading}
          choices={specializationsList}
          validate={required()}
          {...props}
        />
      ) : (
        <ReferenceArrayInput source="specializationsIds" reference="Specialization">
          <AutocompleteArrayInput label={label} optionValue="id" optionText="name" validate={required()} {...props} />
        </ReferenceArrayInput>
      )}
    </>
  );
}

SpecializationsSelect.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
};
