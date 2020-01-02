import React from 'react';
import styled from 'styled-components';
import { OrdersQuery_orders as Order } from './OrdersQuery';
import { Box } from 'grommet';
import OrderItemRow from './OrderItemRow';

interface Props {
  order: Order;
}

const HeaderRow = styled(Box)`
  border-top: 1px solid #123456;
  padding: 16px 0;
  font-weight: 500;
`;

const FooterRow = styled(Box)`
  border-bottom: 1px solid #123456;
  padding-top: 8px;
  padding-bottom: 16px;
  font-weight: 500;
`;

const OrderRow: React.FC<Props> = ({ order }) => {
  return (
    <Box margin={{ bottom: '24px' }}>
      <HeaderRow direction="row">
        <Box basis="40%">{order.orderDate}</Box>
        <Box basis="30%">{order.orderNumber}</Box>
        <Box basis="30%">{order.orderStatus}</Box>
      </HeaderRow>
      {order.items.map((item, i) => (
        <OrderItemRow key={i} item={item} />
      ))}
      <FooterRow direction="row">
        <Box basis="55%" />
        <Box basis="15%" align="end">
          {order.totalNetAmount}
        </Box>
        <Box basis="15%" align="end">
          {order.totalVatAmount}
        </Box>
        <Box basis="15%" align="end">
          {order.totalGrossAmount}
        </Box>
      </FooterRow>
    </Box>
  );
};

export default OrderRow;
