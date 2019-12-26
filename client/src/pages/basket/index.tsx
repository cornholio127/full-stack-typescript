import React from 'react';
import Layout from '../../components/layout';
import { useBasket } from '../../hooks';
import { Box, Heading } from 'grommet';
import BasketItem from './BasketItem';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
  ProductsByIdQuery,
  ProductsByIdQueryVariables,
  ProductsByIdQuery_productsById as Product,
} from './ProductsByIdQuery';
import BasketHeader from './BasketHeader';
import BasketFooter from './BasketFooter';
import { ActionButton } from '../../components/button';
import { intToCurrency, currencyToInt } from '../../util';
import { useHistory } from 'react-router';

const productsByIdQuery = gql`
  query ProductsByIdQuery($ids: [ID!]!) {
    productsById(ids: $ids) {
      id
      name
      description
      price {
        amount
        vatPct
      }
    }
  }
`;

const Basket: React.FC = () => {
  const history = useHistory();
  const [basket, updateBasket] = useBasket();
  const { data, loading } = useQuery<
    ProductsByIdQuery,
    ProductsByIdQueryVariables
  >(productsByIdQuery, {
    fetchPolicy: 'cache-first',
    variables: { ids: basket.map(b => b.productId) },
    skip: basket.length === 0,
  });
  const productById: { [index: string]: Product } = {};
  let totalPrice = '0.00';
  if (data && !loading) {
    data.productsById.forEach(p => (productById[p.id] = p));
    totalPrice = intToCurrency(
      basket
        .map(
          item =>
            currencyToInt(productById[item.productId].price.amount) *
            item.quantity
        )
        .reduce((a, b) => a + b, 0)
    );
  }
  return (
    <Layout>
      <Box width="720px" margin="0 auto">
        <Heading level={2}>Basket</Heading>
        <Box>
          {data && !loading && basket.length > 0 ? (
            <>
              <BasketHeader />
              {basket.map((item, i) => (
                <BasketItem
                  key={i}
                  product={productById[item.productId]}
                  quantity={item.quantity}
                  onRemove={productId => updateBasket(productId, 0)}
                />
              ))}
              <BasketFooter totalPrice={totalPrice} />
              <Box direction="row" justify="end" margin={{ top: '24px' }}>
                <ActionButton
                  label="Checkout"
                  onClick={() => history.push('/checkout')}
                />
              </Box>
            </>
          ) : (
            <span>The basket is empty.</span>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Basket;
