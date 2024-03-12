import PropTypes from 'prop-types';
import { AutocompleteArrayInput, ReferenceArrayInput, SelectArrayInput, useGetList } from 'react-admin';
import { RESOURCES } from '../../_lib/consts';

export function OrganizationTypesSelect({ label, type = 'create', ...props }) {
  const { data: typesList, isLoading: typesLoading } = useGetList(RESOURCES.organizationType);

  return (
    <>
      {type === 'create' && (
        <SelectArrayInput
          name={'type'}
          source={'type'}
          label={label}
          isLoading={typesLoading}
          choices={typesList}
          {...props}
        />
      )}
      {type === 'edit' && (
        <ReferenceArrayInput source={'organizationTypesIds'} reference="OrganizationType">
          <AutocompleteArrayInput label={label} optionValue="id" optionText="name" {...props} />
        </ReferenceArrayInput>
      )}
    </>
  );
}

OrganizationTypesSelect.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(['create', 'edit']),
};
