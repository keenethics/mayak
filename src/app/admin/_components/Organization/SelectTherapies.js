import { Loading, SelectArrayInput, required, useGetList } from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';
import PropTypes from 'prop-types';

export function SelectTherapies({ isActive }) {
  const { data: therapies, isLoading } = useGetList(RESOURCES.therapy);
  if (isLoading) return <Loading />;
  return (
    <SelectArrayInput
      label="Типи"
      source="therapies"
      validate={isActive && required()}
      choices={therapies.map(therapy => ({ id: therapy.name, name: therapy.name }))}
    />
  );
}

SelectTherapies.propTypes = {
  isActive: PropTypes.bool,
};
