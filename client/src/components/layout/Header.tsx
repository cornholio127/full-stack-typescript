import React from 'react';
import styled from 'styled-components';
import { Box, Menu } from 'grommet';
import GlobalSearch from '../globalsearch';
import Icon from '../icon';
import { NavLink, useHistory } from 'react-router-dom';
import Link from '../link';
import BasketIcon from './BasketIcon';
import { useToken } from 'src/hooks';

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

const StyledMenu = styled(Menu)`
  color: #c0c0c0;
  &:hover {
    color: #ffffff;
  }
`;

const MenuItemLabel = styled.div`
  align-self: center;
  margin-left: 16px;
`;

const Header: React.FC = () => {
  const history = useHistory();
  const [token, setToken] = useToken();
  const isLoggedIn = token && token.length > 0;
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
        {isLoggedIn ? (
          <StyledMenu
            dropProps={{ align: { top: 'bottom', left: 'left' } }}
            icon={<Icon type="user" />}
            items={[
              {
                label: <MenuItemLabel>Order history</MenuItemLabel>,
                icon: <Icon type="list" />,
                onClick: () => history.push('/orders'),
              },
              {
                label: <MenuItemLabel>Logout</MenuItemLabel>,
                icon: <Icon type="log-out" />,
                onClick: () => {
                  setToken();
                  history.push('/');
                },
              },
            ]}
          />
        ) : (
          <Link url="/login" icon="lock">
            Login
          </Link>
        )}
        <BasketIcon />
      </Box>
    </Container>
  );
};

export default Header;
