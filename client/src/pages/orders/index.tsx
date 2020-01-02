import React from 'react';
import Layout from '../../components/layout';
import { Box, Heading } from 'grommet';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { OrdersQuery } from './OrdersQuery';
import OrderRow from './OrderRow';

const ordersQuery = gql`
  query OrdersQuery {
    orders {
      id
      orderNumber
      orderDate
      orderStatus
      totalNetAmount
      totalVatAmount
      totalGrossAmount
      items {
        id
        product {
          id
          name
        }
        quantity
        netAmount
        vatAmount
        grossAmount
      }
    }
  }
`;

const Orders: React.FC = () => {
  const { data } = useQuery<OrdersQuery>(ordersQuery, {
    fetchPolicy: 'cache-and-network',
  });
  return (
    <Layout>
      <Box width="720px" margin="0 auto">
        <Heading level={2}>Order history</Heading>
        {data &&
          data.orders.map((order, i) => <OrderRow key={i} order={order} />)}
      </Box>
    </Layout>
  );
};

export default Orders;
