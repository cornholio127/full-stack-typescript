import React from 'react';
import { Box, Heading } from 'grommet';
import Layout from '../../components/layout';

const Checkout: React.FC = () => {
  return (
    <Layout>
      <Box width="720px" margin="0 auto">
        <Heading level={2}>Checkout</Heading>
      </Box>
    </Layout>
  );
};

export default Checkout;
