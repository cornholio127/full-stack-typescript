import React from 'react';
import styled from 'styled-components';
import { useBasket } from '../../hooks';
import Link from '../link';

const Container = styled.div`
  position: relative;
  z-index: 5;
`;

const Indicator = styled.div`
  position: absolute;
  width: 23px;
  text-align: center;
  top: -14px;
  right: -9px;
  font-size: 14px;
  font-weight: 700;
  &:before {
    z-index: -5;
    top: -1px;
    right: 1px;
    background: ${props => props.theme.global?.colors?.brand};
    border-radius: 50%;
    width: 21px;
    height: 21px;
    display: block;
    position: absolute;
    content: ' ';
  }
`;

const BasketIcon: React.FC = () => {
  const [basket] = useBasket();
  const sum = basket.map(b => b.quantity).reduce((a, b) => a + b, 0);
  return (
    <Container>
      <Link url="/basket" icon="shopping-bag" />
      {sum > 0 && <Indicator>{sum > 9 ? '>9' : sum}</Indicator>}
    </Container>
  );
};

export default BasketIcon;
