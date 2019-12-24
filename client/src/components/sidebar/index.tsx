import React from 'react';
import styled from 'styled-components';
import SidebarItem from './SidebarItem';
import { Heading } from 'grommet';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { AllCategories } from './AllCategories';
import { useRouteMatch } from 'react-router';
import { idFromSlug } from '../../util';

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    padding: 12px 0;
    a {
      text-decoration: none;
      color: #123456;
      font-size: 18px;
      font-weight: 500;
      margin-top: 2px;
      &:hover {
        color: ${props => props.theme.global?.colors?.brand};
      }
    }
    border-bottom: 1px solid #123456;
    &:last-child {
      border: 0;
    }
  }
`;

const categoriesQuery = gql`
  query AllCategories {
    categories {
      id
      name
    }
  }
`;

const Sidebar: React.FC = () => {
  const { data, client } = useQuery<AllCategories>(categoriesQuery, {
    fetchPolicy: 'cache-first',
  });
  const match = useRouteMatch<{ slug: string }>(`/tag/:slug`);
  const categoryId = match?.params.slug && idFromSlug(match.params.slug);
  if (data && data.categories) {
    const result = data.categories.filter(c => c.id === categoryId);
    if (result.length === 1) {
      client.writeData({
        data: { selectedCategory: result[0] },
      });
    }
  }
  const categories = (data && data.categories) || [];
  return (
    <>
      <Heading level={3} margin={{ left: '24px' }}>
        Categories
      </Heading>
      <StyledList>
        {categories.map((c, i) => (
          <li key={i}>
            <SidebarItem category={c} />
          </li>
        ))}
      </StyledList>
    </>
  );
};

export default Sidebar;
