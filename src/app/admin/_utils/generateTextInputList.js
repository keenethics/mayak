import { TextInput } from 'react-admin';

const generateTextInputList = (inputList, className, ...props) => inputList.map(({ name, type, label }) => (
  <TextInput
    key={name}
    name={name}
    source={name}
    type={type}
    label={label}
    className={className}
    {...props}
  />
));

export { generateTextInputList };
