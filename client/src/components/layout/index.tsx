import React from 'react';
import styled from 'styled-components';
import Sidebar from '../sidebar';
import Header from './Header';
import Footer from './Footer';

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Container = styled.div`
  margin: 0 auto;
  @media (min-width: 992px) {
    max-width: 940px;
  }
  @media (min-width: 1200px) {
    max-width: 1195px;
  }
  @media (min-width: 1400px) {
    max-width: 1355px;
  }
`;

const ContentContainer = styled(Container)`
  position: relative;
  display: flex;
  flex-direction: row;
  padding-bottom: 240px;
`;

const HeaderBackground = styled.div`
  background-color: #123456;
`;

const FooterBackground = styled.div`
  color: #efefef;
  background-color: #666668;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 240px;
  box-sizing: border-box;
`;

const LeftColumn = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 264px;
  position: absolute;
  min-height: 100px;
  height: calc(100vh - 240px);
  background: #eaeaed;
  padding: 16px;
  box-sizing: border-box;
  border-right: 1px solid #123456;
`;

const RightColumn = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  margin-left: 264px;
  padding: 16px;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <PageContainer>
      <HeaderBackground>
        <Container>
          <Header />
        </Container>
      </HeaderBackground>
      <ContentContainer>
        <LeftColumn>
          <Sidebar />
        </LeftColumn>
        <RightColumn>{children}</RightColumn>
      </ContentContainer>
      <FooterBackground>
        <Container>
          <Footer />
        </Container>
      </FooterBackground>
    </PageContainer>
  );
};

export default Layout;
