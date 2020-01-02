import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Box, Heading } from 'grommet';

const StyledText = styled.div`
  font-size: 20px;
  margin-top: 48px;
`;

const StyledLink = styled(NavLink)`
  color: #123456;
  &:hover {
    color: ${props => props.theme.global?.colors?.brand};
  }
`;

const OrderSuccess: React.FC = () => {
  return (
    <Box align="center">
      <Heading level={2}>Thank you for your order!</Heading>
      <StyledText>
        We have received your order and will process it as soon as possible.
      </StyledText>
      <StyledText>
        Your can review all your orders in the{' '}
        <StyledLink to="/orders">order history</StyledLink>.
      </StyledText>
    </Box>
  );
};

export default OrderSuccess;
