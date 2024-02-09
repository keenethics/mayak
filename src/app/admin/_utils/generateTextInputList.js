import React from 'react';
import { required, TextInput } from 'react-admin';

const generateTextInputList = (inputList, ...props) => inputList.map(({
  name, type, label, validate,
}) => (
  <TextInput
    key={name}
    name={name}
    source={name}
    type={type}
    label={label}
    validate={validate && required()}
    {...props}
  />
));

export { generateTextInputList };
