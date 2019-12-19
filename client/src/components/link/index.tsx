import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Icon, { IconType } from '../icon';
import { Box } from 'grommet';

interface Props {
  url?: string;
  icon?: IconType;
}

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #c0c0c0;
  &:hover {
    color: #ffffff;
  }
`;

const Link: React.FC<Props> = ({ url = '', icon, children }) => {
  return (
    <StyledLink to={url}>
      <Box direction="row" align="center">
        {icon && (
          <Box margin={{ right: '8px' }}>
            <Icon type={icon} />
          </Box>
        )}
        {children}
      </Box>
    </StyledLink>
  );
};

export default Link;
