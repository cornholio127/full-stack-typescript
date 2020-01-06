import React, { useState } from 'react';
import Layout from '../../components/layout';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { SearchProducts, SearchProductsVariables } from './SearchProducts';
import { Box, Heading } from 'grommet';
import ProductTile from './ProductTile';
import SkeletonTile from './SkeletonTile';
import { useParams } from 'react-router';
import { idFromSlug } from '../../util';
import { useSelectedCategory } from '../../hooks';
import { ActionButton } from '../../components/button';

const searchProductsQuery = gql`
  query SearchProducts($categoryId: ID!, $limit: Int!, $offset: Int!) {
    searchProducts(categoryId: $categoryId, limit: $limit, offset: $offset) {
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
  const selectedCategory = useSelectedCategory();
  const [loadingMore, setLoadingMore] = useState(false);
  const categoryName = selectedCategory?.name || '';
  const { data, loading, fetchMore } = useQuery<
    SearchProducts,
    SearchProductsVariables
  >(searchProductsQuery, {
    fetchPolicy: 'cache-and-network',
    variables: {
      categoryId,
      limit: 15,
      offset: 0,
    },
  });
  const loadMore = () => {
    setLoadingMore(true);
    fetchMore({
      variables: {
        offset: data?.searchProducts.length || 0,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        return Object.assign({}, prev, {
          searchProducts: [
            ...prev.searchProducts,
            ...fetchMoreResult.searchProducts,
          ],
        });
      },
    }).finally(() => setLoadingMore(false));
  };
  return (
    <Layout>
      <Box width="720px" margin="0 auto">
        <Heading level={2}>{categoryName}</Heading>
        <Box>
          {data &&
            (!loading || loadingMore) &&
            rows(data.searchProducts, 3).map((row, i) => (
              <Box key={i} direction="row" margin={{ bottom: '32px' }}>
                {row.map((p, j) => (
                  <ProductTile key={j} product={p} />
                ))}
              </Box>
            ))}
          {(!data || loading) &&
            rows([...Array(15).keys()], 3).map((row, i) => (
              <Box key={i} direction="row" margin={{ bottom: '32px' }}>
                {row.map((_, j) => (
                  <SkeletonTile key={j} />
                ))}
              </Box>
            ))}
          <Box direction="row" justify="center">
            <ActionButton label="Load more" onClick={loadMore} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Category;
