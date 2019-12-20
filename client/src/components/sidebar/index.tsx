import React from 'react';
import styled from 'styled-components';
import SidebarItem from './SidebarItem';
import { Heading } from 'grommet';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { AllCategories } from './AllCategories';

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
  const { data } = useQuery<AllCategories>(categoriesQuery, {
    fetchPolicy: 'cache-first',
  });
  const categories = (data && data.categories) || [];
  return (
    <>
      <Heading level={3} margin={{ left: '24px' }}>
        Categories
      </Heading>
      <StyledList>
        {categories.map((c, i) => (
          <li>
            <SidebarItem key={i} label={c.name} />
          </li>
        ))}
      </StyledList>
    </>
  );
};

export default Sidebar;
