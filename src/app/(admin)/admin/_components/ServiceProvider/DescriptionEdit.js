import PropTypes from 'prop-types';
import { TextInput } from 'react-admin';

export function DescriptionEdit({ validate }) {
  return <TextInput name="description" source="description" label="Опис" validate={validate} fullWidth multiline />;
}

DescriptionEdit.propTypes = {
  validate: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};
