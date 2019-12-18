import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/sidebar';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeftColumn = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 200px;
`;

const RightColumn = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <LeftColumn>
        <Sidebar />
      </LeftColumn>
      <RightColumn>{children}</RightColumn>
    </Container>
  );
};

export default Layout;
