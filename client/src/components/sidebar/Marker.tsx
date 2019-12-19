import React from 'react';
import styled from 'styled-components';
import Icon from '../icon';
import { useRouteMatch } from 'react-router';

interface Props {
  url: string;
}

const Container = styled.div`
  width: 24px;
  height: 24px;
  color: ${props => props.theme.global?.colors?.brand};
`;

const Marker: React.FC<Props> = ({ url }) => {
  const match = useRouteMatch(url);
  return (
    <Container>
      {match?.isExact ? <Icon type="chevron-right" /> : null}
    </Container>
  );
};

export default Marker;
