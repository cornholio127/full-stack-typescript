import React from 'react';
import { TextInput as GrommetTextInput } from 'grommet';

interface Props {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler;
  placeholder?: string;
  password?: boolean;
}

const TextInput: React.FC<Props> = ({
  name,
  value,
  onChange,
  placeholder,
  password,
}) => {
  return (
    <GrommetTextInput
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={password === true ? 'password' : undefined}
    />
  );
};

export { TextInput };
