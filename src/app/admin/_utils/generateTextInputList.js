import { required, TextInput } from 'react-admin';

export const generateTextInputList = (inputList, className, ...props) => inputList.map(({
  name, type, label, validate,
}) => (
  <TextInput
    key={name}
    name={name}
    source={name}
    type={type}
    label={label}
    className={className}
    validate={validate && required()}
    {...props}
  />
));
