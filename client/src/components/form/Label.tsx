import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const Label: React.FC = ({ children }) => {
  return <StyledSpan>{children}</StyledSpan>;
};

export default Label;
