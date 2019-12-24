import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/layout';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import {
  ProductDetails,
  ProductDetailsVariables,
  ProductDetails_productById as ProductDetailsData,
} from './ProductDetails';
import { useParams } from 'react-router';
import { idFromSlug } from 'src/util';
import { Box, Heading, Carousel } from 'grommet';
import DetailsRow from './DetailsRow';
import Text from '../../components/text';
import SpecificationGroup from './SpecificationGroup';
import { ActionButton } from '../../components/button';
import { useBasket } from '../../hooks';

const productDetailsQuery = gql`
  query ProductDetails($id: ID!) {
    productById(id: $id) {
      id
      name
      description
      price {
        amount
        vatPct
      }
      images {
        url
        isMain
      }
      specification {
        name
        attributes {
          name
          value
        }
      }
      category {
        id
        name
      }
    }
  }
`;

interface RouteParams {
  slug: string;
}

const emptyProduct: ProductDetailsData = {
  __typename: 'Product',
  id: '',
  name: '',
  description: '',
  price: {
    __typename: 'Price',
    amount: '',
    vatPct: '',
  },
  images: [],
  specification: [],
  category: {
    __typename: 'Category',
    id: '',
    name: '',
  },
};

const Price = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin: 48px 0;
`;

const Product: React.FC = () => {
  const { slug } = useParams<RouteParams>();
  const productId = idFromSlug(slug);
  const { data, client } = useQuery<ProductDetails, ProductDetailsVariables>(
    productDetailsQuery,
    {
      fetchPolicy: 'cache-and-network',
      variables: { id: productId },
    }
  );
  if (data && data.productById) {
    client.writeData({ data: { selectedCategory: data.productById.category } });
  }
  const product: ProductDetailsData =
    (data && data.productById) || emptyProduct;
  const [, updateBasket] = useBasket();
  return (
    <Layout>
      <Box width="720px" margin="0 auto">
        <Heading level={2}>{product.name}</Heading>
        <Carousel fill={true}>
          {product.images.map((image, i) => (
            <Box key={i} direction="row" justify="center">
              <img
                src={image.url}
                alt={product.name}
                width={600}
                height={400}
              />
            </Box>
          ))}
        </Carousel>
        <Box direction="row" justify="between">
          <Price>CHF {product.price.amount}</Price>
          <Box justify="center">
            <ActionButton
              label="Add to basket"
              icon="shopping-bag"
              onClick={() => updateBasket(product.id, 1)}
            />
          </Box>
        </Box>
        <DetailsRow label="Description">
          <Text text={product.description || ''} />
        </DetailsRow>
        <DetailsRow label="Specification">
          {product.specification.map((cat, i) => (
            <SpecificationGroup
              key={i}
              title={cat.name}
              attributes={cat.attributes}
            />
          ))}
        </DetailsRow>
      </Box>
    </Layout>
  );
};

export default Product;
