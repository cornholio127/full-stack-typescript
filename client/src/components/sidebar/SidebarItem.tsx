import React from 'react';
import { NavLink } from 'react-router-dom';
import Marker from './Marker';
import { Box } from 'grommet';
import { AllCategories_categories as Category } from './AllCategories';
import { slug } from '../../util';

interface Props {
  category: Category;
}

const SidebarItem: React.FC<Props> = ({ category }) => {
  const url = `/tag/${slug(category.name, category.id)}`;
  return (
    <Box direction="row">
      <Marker url={url} />
      <NavLink to={url}>{category.name}</NavLink>
    </Box>
  );
};

export default SidebarItem;
