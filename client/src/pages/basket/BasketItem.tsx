import React from 'react';
import { Box } from 'grommet';

interface Props {
  product: { productId: string; quantity: number };
}

const BasketItem: React.FC<Props> = ({ product }) => {
  return (
    <Box direction="row">
      <Box basis="1/3">{product.productId}</Box>
      <Box basis="2/3">{product.quantity}</Box>
    </Box>
  );
};

export default BasketItem;
