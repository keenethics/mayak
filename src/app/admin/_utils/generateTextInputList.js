import { required, TextInput } from 'react-admin';

function generateTextInputList(inputList, className, ...props) {
  return inputList.map(({
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
}

export { generateTextInputList };
