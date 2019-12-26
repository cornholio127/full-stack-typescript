import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

interface Props {
  totalPrice: string;
}

const Row = styled(Box)`
  padding: 8px;
  font-weight: 600;
`;

const BasketFooter: React.FC<Props> = ({ totalPrice }) => {
  return (
    <Row direction="row">
      <Box basis="50%">Total</Box>
      <Box basis="20%" align="end">
        {totalPrice}
      </Box>
      <Box basis="30%" align="end"></Box>
    </Row>
  );
};

export default BasketFooter;
