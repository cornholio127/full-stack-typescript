import React from 'react';
import styled from 'styled-components';
import { TextInput as GrommetTextInput } from 'grommet';

interface Props {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler;
  placeholder?: string;
  password?: boolean;
}

const StyledInput = styled(GrommetTextInput)`
  box-shadow: none;
  box-sizing: border-box;
  height: 44px;
  font-weight: 500;
  &:focus {
    border-width: 2px;
    padding: 10px;
  }
`;

const TextInput: React.FC<Props> = ({
  name,
  value,
  onChange,
  placeholder,
  password,
}) => {
  return (
    <StyledInput
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={password === true ? 'password' : undefined}
    />
  );
};

export { TextInput };
