import React from 'react';
import styled from 'styled-components';

export type Status = 'open' | 'active' | 'completed';

interface Props {
  label: string;
  status: Status;
}

const StyledStep = styled.div<{ status: Status }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props =>
    props.status === 'completed'
      ? '#123456'
      : props.status === 'active'
      ? props.theme.global?.colors?.brand
      : '#ffffff'};
  color: ${props => (props.status === 'completed' ? '#efefef' : '#123456')};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  box-sizing: border-box;
  border: 4px solid #123456;
  z-index: 5;
`;

const ProcessStep: React.FC<Props> = ({ label, status }) => (
  <StyledStep status={status}>{label}</StyledStep>
);

export default ProcessStep;
