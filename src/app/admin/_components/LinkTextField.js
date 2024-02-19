import { TextField, useRecordContext, useRedirect } from 'react-admin';
import PropTypes from 'prop-types';

export const LinkTextField = ({ source, label, pathFn }) => {
  const redirect = useRedirect();
  const record = useRecordContext();

  if (!record) return null;

  return (
    <TextField
      className="cursor-pointer"
      label={label}
      source={source}
      record={record}
      onClick={() => redirect(pathFn(record.id))}
    />
  );
};

LinkTextField.propTypes = {
  source: PropTypes.string,
  label: PropTypes.string,
  pathFn: PropTypes.func,
};
