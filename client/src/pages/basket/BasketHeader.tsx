import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

const Row = styled(Box)`
  padding: 8px;
  font-weight: 600;
  border-bottom: 1px solid #123456;
`;

const BasketHeader: React.FC = () => {
  return (
    <Row direction="row">
      <Box basis="50%">Product</Box>
      <Box basis="20%" align="end">
        Price in CHF
      </Box>
      <Box basis="20%" align="end">
        Quantity
      </Box>
      <Box basis="10%"></Box>
    </Row>
  );
};

export default BasketHeader;
