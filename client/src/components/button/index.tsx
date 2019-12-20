import React from 'react';
import styled from 'styled-components';
import { Button, ButtonProps } from 'grommet';
import Icon from '../icon';

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
`;

const StyledButton = styled(Button)`
  width: 144px;
  height: 40px;
  border-radius: 12px;
  background: #eaeaed;
  color: #123456;
  border: 1px solid #123456;
  font-weight: 600;
  line-height: 22px;
  &:hover {
    ${props => !props.disabled && 'border: 2px solid #123456;'}
    box-shadow: none;
  }
  &:active {
    box-shadow: none;
    ${props => !props.disabled && 'background: #dadadd;'}
  }
  &:focus {
    box-shadow: none;
  }
`;

export const SubmitButton: React.FC<ButtonProps> = props => {
  return (
    <StyledButton
      {...props}
      icon={
        <IconWrapper>
          <Icon type="chevron-right" />
        </IconWrapper>
      }
      reverse={true}
    />
  );
};
