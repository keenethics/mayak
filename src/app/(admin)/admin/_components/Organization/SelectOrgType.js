import { Loading, useGetList, required, SelectArrayInput } from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';
import PropTypes from 'prop-types';

export function SelectOrganizationType({ isActive }) {
  const { data: organizationTypes, isLoading } = useGetList(RESOURCES.organizationType);
  if (isLoading) return <Loading />;
  return (
    <SelectArrayInput
      source="type"
      choices={organizationTypes.map(type => ({ id: type.name, name: type.name }))}
      validate={isActive && required()}
      label="Тип організації"
    />
  );
}

SelectOrganizationType.propTypes = {
  isActive: PropTypes.bool,
};
