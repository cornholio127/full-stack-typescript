import React from 'react';
import styled from 'styled-components';
import { TextInput as GrommetTextInput, Box } from 'grommet';
import { useFormikContext } from 'formik';

interface Props {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler;
  placeholder?: string;
  password?: boolean;
  errors?: string[] | string;
}

const StyledInput = styled(GrommetTextInput)<{ error: boolean }>`
  box-shadow: none;
  box-sizing: border-box;
  height: 44px;
  font-weight: 500;
  &:focus {
    border-width: 2px;
    padding: 10px;
  }
  ${props => props.error && 'border-color: #e80000;'}
`;

const StyledError = styled.div`
  color: #e80000;
  font-size: 13px;
  font-weight: 500;
`;

const TextInput: React.FC<Props> = ({
  name,
  value,
  onChange,
  placeholder,
  password,
  errors,
}) => {
  const formik = useFormikContext();
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13 || e.keyCode === 10) {
      if (formik && formik.isValid) {
        formik.submitForm();
      }
    }
  };
  return (
    <Box>
      <StyledInput
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        type={password === true ? 'password' : undefined}
        error={!!errors}
      />
      {errors &&
        (errors as string[]).map((err, i) => (
          <StyledError key={i}>{err}</StyledError>
        ))}
    </Box>
  );
};

export { TextInput };
