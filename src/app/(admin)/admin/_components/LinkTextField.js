import { TextField, useRecordContext } from 'react-admin';
import PropTypes from 'prop-types';

export const LinkTextField = ({ source, label, onClick }) => {
  const record = useRecordContext();

  if (!record) return null;

  return (
    <TextField
      className="cursor-pointer"
      label={label}
      source={source}
      record={record}
      onClick={() => onClick(record.id)}
    />
  );
};

LinkTextField.propTypes = {
  source: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
};
