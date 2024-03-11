import { BooleanInput } from 'react-admin';
import PropTypes from 'prop-types';

export function ActivationForm({ label }) {
  return <BooleanInput name="isActive" source="isActive" label={label} className="mt-8" />;
}

ActivationForm.propTypes = {
  label: PropTypes.string,
};
