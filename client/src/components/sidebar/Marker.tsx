import React from 'react';
import styled from 'styled-components';
import Icon from '../icon';

interface Props {
  visible: boolean;
}

const Container = styled.div`
  width: 24px;
  height: 24px;
  color: ${props => props.theme.global?.colors?.brand};
`;

const Marker: React.FC<Props> = ({ visible }) => {
  return <Container>{visible && <Icon type="chevron-right" />}</Container>;
};

export default Marker;
