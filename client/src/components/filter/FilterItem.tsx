import React from 'react';
import styled from 'styled-components';
import { FilterType } from './types';
import { MiniActionButton } from '../button';

interface Props {
  filter: FilterType;
  onRemove: (filter: FilterType) => void;
}

const StyledItem = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  user-select: none;
  padding: 4px 4px 4px 8px;
  margin-right: 8px;
  background: #123456;
  color: #efefef;
  line-height: 16px;
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  box-sizing: border-box;
  background-color: #ffffff;
  opacity: 0.25;
  margin: 0 4px 0 8px;
  flex-grow: 0;
  flex-shrink: 0;
`;

const FilterItem: React.FC<Props> = ({ filter, onRemove }) => {
  return (
    <StyledItem>
      <div>{filter[1]}</div>
      <Divider />
      <MiniActionButton icon="x" onClick={() => onRemove(filter)} />
    </StyledItem>
  );
};

export default FilterItem;
