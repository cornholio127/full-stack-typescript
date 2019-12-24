import React from 'react';
import Layout from '../../components/layout';
import { useBasket } from 'src/hooks';
import { Box, Heading } from 'grommet';
import BasketItem from './BasketItem';

const Basket: React.FC = () => {
  const [basket, updateBasket] = useBasket();
  return (
    <Layout>
      <Box width="720px" margin="0 auto">
        <Heading level={2}>Basket</Heading>
        <Box>
          {basket.map((item, i) => (
            <BasketItem product={item} />
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default Basket;
