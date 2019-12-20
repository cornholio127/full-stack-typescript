import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, TextInput } from 'grommet';
import Icon from '../icon';

const Container = styled.div`
  position: relative;
`;

const StyledTextInput = styled(TextInput)`
  background: rgba(255, 255, 255, 0.067);
  border: 1px solid #c0c0c0;
  font-weight: 500;
  &:focus {
    border: 2px solid #cacacd;
    padding: 10px;
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  padding: 4px;
  top: 6px;
  right: 8px;
  box-shadow: none;
  color: #c0c0c0;
  &:hover {
    color: #ffffff;
  }
`;

const GlobalSearch: React.FC = () => {
  const [value, setValue] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <Container>
      <StyledTextInput
        name="search"
        value={value}
        onChange={onChange}
        placeholder="Search products"
      />
      <StyledButton icon={<Icon type="search" />} />
    </Container>
  );
};

export default GlobalSearch;
