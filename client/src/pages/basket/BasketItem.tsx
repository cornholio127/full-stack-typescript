import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
import { ProductsByIdQuery_productsById as Product } from './ProductsByIdQuery';
import { MiniActionButton } from '../../components/button';
import { NavLink } from 'react-router-dom';
import { slug } from '../../util';

interface Props {
  product: Product;
  quantity: number;
  onRemove: (productId: string) => void;
}

const Row = styled(Box)`
  border-bottom: 1px solid #123456;
  padding: 8px;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #123456;
  &:hover {
    color: ${props => props.theme.global?.colors?.brand};
  }
`;

const BasketItem: React.FC<Props> = ({ product, quantity, onRemove }) => {
  return (
    <Row direction="row">
      <Box basis="50%">
        <StyledLink to={`/product/${slug(product.name, product.id)}`}>
          {product.name}
        </StyledLink>
      </Box>
      <Box basis="20%" align="end">
        {product.price.amount}
      </Box>
      <Box basis="20%" align="end">
        {quantity}
      </Box>
      <Box basis="10%" direction="row" justify="end">
        <MiniActionButton icon="x" onClick={() => onRemove(product.id)} />
      </Box>
    </Row>
  );
};

export default BasketItem;
