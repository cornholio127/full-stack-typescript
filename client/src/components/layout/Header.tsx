import React from 'react';
import styled from 'styled-components';
import { Box, Button } from 'grommet';
import GlobalSearch from '../globalsearch';
import Icon from '../icon';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
  height: 80px;
  color: #efefef;
`;

const LogoLink = styled(NavLink)`
  display: flex;
  flex-direction: row;
  width: 300px;
  align-items: center;
  color: ${props => props.theme.global?.colors?.brand};
  text-decoration: none;
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
      <LogoLink to="/">
        <Icon type="target" size="xlarge" />
        <LogoText>Shop</LogoText>
      </LogoLink>
      <Box flex="grow">
        <GlobalSearch />
      </Box>
      <Box
        direction="row"
        width="200px"
        height="40px"
        align="center"
        justify="around"
      >
        <Button>
          <Icon type="lock" />
          Login
        </Button>
        <Button>
          <Icon type="shopping-bag" />
        </Button>
      </Box>
    </Container>
  );
};

export default Header;
