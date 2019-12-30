import React, { useState } from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
import { SearchProducts_searchProducts as Product } from './SearchProducts';
import { NavLink } from 'react-router-dom';
import { slug } from '../../util';
import { MiniActionButton } from '../../components/button';
import { useBasket } from '../../hooks';
import SkeletonTile from './SkeletonTile';

interface Props {
  product: Product;
}

const ProductName = styled(Box)`
  font-weight: 500;
  margin: 8px 0;
`;

const Actions = styled(Box)`
  z-index: 5;
  opacity: 0;
`;

interface TileProps {
  visible: boolean;
}

const Container = styled.div`
  width: 240px;
  height: 201px;
  border-right: 1px solid #123456;
  &:last-child {
    border-right: 0;
  }
`;

const Tile = styled.div<TileProps>`
  ${props => (props.visible ? '' : 'display: none;')};
  position: relative;
  padding: 8px 20px;
  &:hover {
    background: #f0f0f4;
  }
  &:hover ${Actions} {
    opacity: 1;
  }
`;

const StyledLink = styled(NavLink)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ProductTile: React.FC<Props> = ({ product }) => {
  const [loaded, setLoaded] = useState(false);
  const [, updateBasket] = useBasket();
  const mainImage = product.images.filter(i => i.isMain === true)[0];
  return (
    <Container>
      <Tile visible={loaded}>
        <Box>
          <img
            src={mainImage.url}
            alt={product.name}
            width={200}
            height={133}
            onLoad={() => setLoaded(true)}
          />
          <Box>
            <ProductName>{product.name}</ProductName>
            <Box direction="row" justify="between">
              <Box>CHF {product.price.amount}</Box>
              <Actions>
                <MiniActionButton
                  icon="shopping-bag"
                  label="Add to basket"
                  onClick={() => updateBasket(product.id, 1)}
                />
              </Actions>
            </Box>
          </Box>
        </Box>
        <StyledLink to={`/product/${slug(product.name, product.id)}`} />
      </Tile>
      {loaded === false && <SkeletonTile />}
    </Container>
  );
};

export default ProductTile;
