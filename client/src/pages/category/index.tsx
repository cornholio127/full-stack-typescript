import React, { useState } from 'react';
import Layout from '../../components/layout';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { SearchProducts, SearchProductsVariables } from './SearchProducts';
import { Box, Heading } from 'grommet';
import ProductTile from './ProductTile';
import SkeletonTile from './SkeletonTile';
import { useParams, useHistory, useLocation } from 'react-router';
import { idFromSlug, categoryUri } from '../../util';
import { useSelectedCategory } from '../../hooks';
import { ActionButton } from '../../components/button';
import Filter from '../../components/filter';
import { FilterType } from '../../components/filter/types';

const searchProductsQuery = gql`
  query SearchProducts(
    $categoryId: ID!
    $filters: [Filter!]!
    $limit: Int!
    $offset: Int!
  ) {
    searchProducts(
      categoryId: $categoryId
      filters: $filters
      limit: $limit
      offset: $offset
    ) {
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

const parseFilter = (search: string): FilterType[] => {
  if (search === undefined || search.length < 2) {
    return [];
  }
  const parts = search.substring(1).split('&');
  return parts.map(part => {
    const nv = part.split('=');
    return [decodeURIComponent(nv[0]), decodeURIComponent(nv[1])];
  });
};

const Category: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const filter = parseFilter(location.search);
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
      filters: filter.map(f => ({ name: f[0], value: f[1] })),
      limit: 15,
      offset: 0,
    },
  });
  const setFilter = (filter: FilterType[]) => {
    history.push(categoryUri(slug, filter));
  };
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
        <Filter filter={filter} onChange={setFilter} />
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
