import PropTypes from 'prop-types';
import { AutocompleteArrayInput, ReferenceArrayInput, SelectArrayInput, required, useGetList } from 'react-admin';
import { RESOURCES } from '../../../_lib/consts';

export function SpecializationsSelect({ type = 'create', label, ...props }) {
  const { data: specializationsList, isLoading: specializationsLoading } = useGetList(RESOURCES.specialization);

  return (
    <>
      {type === 'create' ? (
        <SelectArrayInput
          name={'specializations'}
          source={'specializations'}
          label={label}
          isLoading={specializationsLoading}
          choices={specializationsList}
          validate={required()}
          {...props}
        />
      ) : (
        <ReferenceArrayInput source={'specializationsIds'} reference="Specialization">
          <AutocompleteArrayInput label={label} optionValue="id" optionText="name" validate={required()} {...props} />
        </ReferenceArrayInput>
      )}
    </>
  );
}

SpecializationsSelect.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(['create', 'edit']),
};
