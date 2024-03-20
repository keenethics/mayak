import PropTypes from 'prop-types';
import { TextInput } from 'react-admin';

export function DescriptionEdit({ validate, className }) {
  return (
    <TextInput
      name="description"
      source="description"
      label="Опис"
      validate={validate}
      className={className}
      fullWidth
      multiline
    />
  );
}

DescriptionEdit.propTypes = {
  validate: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  className: PropTypes.string,
};
