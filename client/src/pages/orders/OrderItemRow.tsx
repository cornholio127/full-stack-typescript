import React from 'react';
import styled from 'styled-components';
import { OrdersQuery_orders_items as OrderItem } from './OrdersQuery';
import { Box } from 'grommet';

interface Props {
  item: OrderItem;
}

const Row = styled(Box)`
  margin-bottom: 4px;
`;

const OrderItemRow: React.FC<Props> = ({ item }) => {
  return (
    <Row direction="row">
      <Box basis="10%">{item.quantity}x</Box>
      <Box basis="45%">{item.product.name}</Box>
      <Box basis="15%" align="end">
        {item.netAmount}
      </Box>
      <Box basis="15%" align="end">
        {item.vatAmount}
      </Box>
      <Box basis="15%" align="end">
        {item.grossAmount}
      </Box>
    </Row>
  );
};

export default OrderItemRow;
