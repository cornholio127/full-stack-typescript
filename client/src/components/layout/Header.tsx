import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
import GlobalSearch from '../globalsearch';
import Icon from '../icon';
import { NavLink } from 'react-router-dom';
import Link from '../link';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
  height: 80px;
  color: #efefef;
  font-size: 18px;
`;

const LogoLink = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${props => props.theme.global?.colors?.brand};
  text-decoration: none;
  margin-left: 16px;
`;

const LogoText = styled.span`
  font-size: 56px;
  font-weight: 900;
  margin-left: 16px;
  margin-top: -8px;
`;

const Header: React.FC = () => {
  return (
    <Container>
      <Box width="280px" direction="row">
        <LogoLink to="/">
          <Icon type="target" size="xlarge" />
          <LogoText>Shop</LogoText>
        </LogoLink>
      </Box>
      <Box flex="grow">
        <GlobalSearch />
      </Box>
      <Box
        direction="row"
        width="200px"
        height="40px"
        align="center"
        justify="around"
        margin={{ left: '16px' }}
      >
        <Link url="/login" icon="lock">
          Login
        </Link>
        <Link url="/basket" icon="shopping-bag" />
      </Box>
    </Container>
  );
};

export default Header;
