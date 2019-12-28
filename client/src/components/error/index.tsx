import React from 'react';
import styled from 'styled-components';
import Icon from '../icon';
import { Box } from 'grommet';

interface Props {
  message: string;
}

const Container = styled(Box)`
  color: #e80000;
`;

const StyledIcon = styled(Icon)`
  margin-right: 8px;
`;

const Error: React.FC<Props> = ({ message }) => {
  return (
    <Container direction="row" align="center">
      <StyledIcon type="x-circle" />
      {message}
    </Container>
  );
};

export default Error;
