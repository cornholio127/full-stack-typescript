import React from 'react';
import styled from 'styled-components';
import { Button, ButtonProps } from 'grommet';
import Icon, { IconType } from '../icon';

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
`;

const StyledFormButton = styled(Button)`
  width: 144px;
  height: 40px;
  border-radius: 12px;
  background: #eaeaed;
  color: #123456;
  border: 1px solid #123456;
  font-weight: 600;
  line-height: 22px;
  box-shadow: none;
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

type CustomButtonProps = Omit<ButtonProps, 'icon'> & {
  icon?: IconType;
} & JSX.IntrinsicElements['button'];

export const FormButton: React.FC<CustomButtonProps> = props => {
  return (
    <StyledFormButton
      {...props}
      icon={
        props.icon && (
          <IconWrapper>
            <Icon type={props.icon} />
          </IconWrapper>
        )
      }
      reverse={true}
    />
  );
};

const StyledActionButton = styled(Button)`
  min-width: 144px;
  background: #123456;
  color: #ffffff;
  border: 0;
  box-shadow: none;
  font-weight: 400;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #123456;
  &:hover {
    box-shadow: none;
    background: ${props => props.theme.global?.colors?.brand};
    border-color: ${props => props.theme.global?.colors?.brand};
  }
  &:active {
    border-color: #123456;
  }
`;

const SmallIconWrapper = styled.div`
  width: 16px;
  height: 16px;
  margin-top: -3px;
`;

export const ActionButton: React.FC<CustomButtonProps> = props => {
  return (
    <StyledActionButton
      {...props}
      icon={
        props.icon && (
          <SmallIconWrapper>
            <Icon type={props.icon} size="xsmall" />
          </SmallIconWrapper>
        )
      }
    />
  );
};

const MiniIconWrapper = styled.div`
  width: 16px;
  height: 16px;
`;

const StyledMiniActionButton = styled(Button)`
  padding: 0;
  &:hover {
    box-shadow: none;
    color: ${props => props.theme.global?.colors?.brand};
  }
  &:active {
    box-shadow: none;
  }
  &:focus {
    box-shadow: none;
  }
`;

export const MiniActionButton: React.FC<CustomButtonProps> = props => {
  return (
    <StyledMiniActionButton
      {...props}
      label=""
      title={props.label}
      icon={
        props.icon && (
          <MiniIconWrapper>
            <Icon type={props.icon} size="xsmall" />
          </MiniIconWrapper>
        )
      }
    />
  );
};
