import { SelectArrayInput, required } from 'react-admin';
import { THERAPIES } from '@admin/_lib/consts';
import PropTypes from 'prop-types';

export function SelectTherapies({ isActive }) {
  return (
    <SelectArrayInput
      label="Типи"
      source="therapies"
      validate={isActive && required()}
      choices={THERAPIES.map(therapy => ({ id: therapy, name: therapy }))}
    />
  );
}

SelectTherapies.propTypes = {
  isActive: PropTypes.bool,
};
