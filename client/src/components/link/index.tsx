import React from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
  text-decoration: none;
  color: #c0c0c0;
  &:hover {
    color: #ffffff;
  }
`;

const Link: React.FC = ({ children }) => {
  const click = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };
  return (
    <StyledLink href="#" onClick={click}>
      {children}
    </StyledLink>
  );
};

export default Link;
