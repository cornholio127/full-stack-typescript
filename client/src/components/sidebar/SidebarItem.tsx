import React from 'react';
import { NavLink } from 'react-router-dom';
import Marker from './Marker';
import { Box } from 'grommet';
import { AllCategories_categories as Category } from './AllCategories';
import { useSelectedCategory } from '../../hooks';
import { slug } from '../../util';

interface Props {
  category: Category;
}

const SidebarItem: React.FC<Props> = ({ category }) => {
  const selectedCategory = useSelectedCategory();
  return (
    <Box direction="row">
      <Marker visible={selectedCategory?.id === category.id} />
      <NavLink to={`/tag/${slug(category.name, category.id)}`}>
        {category.name}
      </NavLink>
    </Box>
  );
};

export default SidebarItem;
