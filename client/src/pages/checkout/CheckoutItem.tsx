import React from 'react';
import styled from 'styled-components';
import { OrderSummaryQuery_orderSummary_items as OrderItem } from './OrderSummaryQuery';
import { Box } from 'grommet';

interface Props {
  item: OrderItem;
}

const Row = styled(Box)`
  border-bottom: 1px solid #123456;
  padding: 8px;
`;

const CheckoutItem: React.FC<Props> = ({ item }) => {
  return (
    <Row direction="row">
      <Box basis="20%">{item.quantity}x</Box>
      <Box basis="50%">{item.product.name}</Box>
      <Box basis="30%" align="end">
        {item.grossAmount}
      </Box>
    </Row>
  );
};

export default CheckoutItem;
