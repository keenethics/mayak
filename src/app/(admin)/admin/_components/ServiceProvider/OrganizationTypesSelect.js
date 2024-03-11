import PropTypes from 'prop-types';
import { SelectArrayInput, useGetList } from 'react-admin';
import { RESOURCES } from '../../_lib/consts';

export function OrganizationTypesSelect({ label, ...props }) {
  const { data: typesList, isLoading: typesLoading } = useGetList(RESOURCES.organizationType);

  return (
    <SelectArrayInput
      name={'type'}
      source={'type'}
      label={label}
      isLoading={typesLoading}
      choices={typesList}
      {...props}
    />
  );
}

OrganizationTypesSelect.propTypes = {
  label: PropTypes.string,
};
