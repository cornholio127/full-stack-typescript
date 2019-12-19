import React from 'react';
import { TextInput as GrommetTextInput } from 'grommet';

interface Props {
  value: string;
  onChange: React.ChangeEventHandler;
  placeholder?: string;
}

const TextInput: React.FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <GrommetTextInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export { TextInput };
