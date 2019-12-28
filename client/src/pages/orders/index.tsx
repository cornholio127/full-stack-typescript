import React from 'react';
import Layout from '../../components/layout';
import { Box, Heading } from 'grommet';

const Orders: React.FC = () => {
  return (
    <Layout>
      <Box width="720px" margin="0 auto">
        <Heading level={2}>Order history</Heading>
      </Box>
    </Layout>
  );
};

export default Orders;
