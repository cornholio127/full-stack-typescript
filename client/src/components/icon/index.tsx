import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ChevronLeft } from './chevron-left.svg';
import { ReactComponent as ChevronRight } from './chevron-right.svg';
import { ReactComponent as Lock } from './lock.svg';
import { ReactComponent as Search } from './search.svg';
import { ReactComponent as ShoppingBag } from './shopping-bag.svg';
import { ReactComponent as Target } from './target.svg';
import { ReactComponent as X } from './x.svg';
import { ReactComponent as XCircle } from './x-circle.svg';
import { ReactComponent as User } from './user.svg';
import { ReactComponent as CreditCard } from './credit-card.svg';
import { ReactComponent as List } from './list.svg';
import { ReactComponent as LogOut } from './log-out.svg';

export type IconType =
  | 'chevron-left'
  | 'chevron-right'
  | 'credit-card'
  | 'list'
  | 'lock'
  | 'log-out'
  | 'search'
  | 'shopping-bag'
  | 'target'
  | 'user'
  | 'x'
  | 'x-circle';

type Size = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

const ICONS: { [index: string]: React.FC } = {
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'credit-card': CreditCard,
  list: List,
  lock: Lock,
  'log-out': LogOut,
  search: Search,
  'shopping-bag': ShoppingBag,
  target: Target,
  user: User,
  x: X,
  'x-circle': XCircle,
};

const SIZES: { [index: string]: string } = {
  xsmall: '16px',
  small: '24px',
  medium: '32px',
  large: '48px',
  xlarge: '64px',
};

interface Props {
  type: IconType;
  size?: Size;
  className?: string;
}

interface WrapperProps {
  size: Size;
}

const Wrapper = styled.span<WrapperProps>`
  width: ${props => SIZES[props.size]};
  height: ${props => SIZES[props.size]};
  display: inline-block;
  svg {
    width: ${props => SIZES[props.size]};
    height: ${props => SIZES[props.size]};
  }
`;

const Icon: React.FC<Props> = ({ className, type, size = 'small' }) => {
  const SvgIcon = ICONS[type];
  return (
    <Wrapper className={className} size={size}>
      <SvgIcon />
    </Wrapper>
  );
};

export default Icon;
