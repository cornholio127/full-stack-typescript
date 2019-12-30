import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
import Icon from '../../components/icon';

const Tile = styled.div`
  border-right: 1px solid #123456;
  padding: 8px 20px;
  color: #eaeaed;
  &:last-child {
    border-right: 0;
  }
`;

const Image = styled.div`
  box-sizing: border-box;
  width: 200px;
  height: 133px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 8px solid #eaeaed;
`;

const SkeletonTile: React.FC = () => {
  return (
    <Tile>
      <Image>
        <Icon type="image" size="xxlarge" />
      </Image>
      <Box>
        <Box
          width="130px"
          height="12px"
          margin={{ top: '11px', bottom: '11px' }}
          background="#eaeaed"
        />
        <Box
          width="90px"
          height="12px"
          margin={{ top: '3px', bottom: '3px' }}
          background="#eaeaed"
        />
      </Box>
    </Tile>
  );
};

export default SkeletonTile;
