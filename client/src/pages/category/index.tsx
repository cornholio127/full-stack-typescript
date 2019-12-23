import React from 'react';
import Layout from '../../components/layout';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { SearchProducts, SearchProductsVariables } from './SearchProducts';
import { Box, Heading } from 'grommet';
import ProductTile from './ProductTile';
import { useParams } from 'react-router';
import { idFromSlug } from '../../util';

const searchProductsQuery = gql`
  query SearchProducts($categoryId: ID!) {
    searchProducts(categoryId: $categoryId) {
      id
      name
      price {
        amount
      }
      images {
        url
        isMain
      }
    }
  }
`;

const rows = <T extends {}>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

interface RouteParams {
  slug: string;
}

const Category: React.FC = () => {
  const { slug } = useParams<RouteParams>();
  const categoryId = idFromSlug(slug);
  const { data, loading } = useQuery<SearchProducts, SearchProductsVariables>(
    searchProductsQuery,
    {
      fetchPolicy: 'cache-and-network',
      variables: { categoryId },
    }
  );
  return (
    <Layout>
      <Box width="720px" margin="0 auto">
        <Heading level={2}>Category</Heading>
        {loading && 'Loading...'}
        {data && (
          <Box>
            {rows(data.searchProducts.slice(0, 20), 3).map((row, i) => (
              <Box key={i} direction="row" margin={{ bottom: '32px' }}>
                {row.map((p, j) => (
                  <ProductTile key={j} product={p} />
                ))}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Category;
