import React from 'react';
import { NavLink } from 'react-router-dom';
import Marker from './Marker';
import { Box } from 'grommet';

interface Props {
  label: string;
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .split(' ')
    .join('-');

const SidebarItem: React.FC<Props> = ({ label }) => {
  const url = `/tag/${slug(label)}`;
  return (
    <Box direction="row">
      <Marker url={url} />
      <NavLink to={url}>{label}</NavLink>
    </Box>
  );
};

export default SidebarItem;
