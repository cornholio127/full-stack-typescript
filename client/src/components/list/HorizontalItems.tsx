import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

const Item = styled.div`
  margin: 0 12px;
  width: 200px;
  flex-grow: 0;
  flex-shrink: 0;
`;

const HorizontalItems: React.FC = ({ children }) => {
  return (
    <Box direction="row" justify="center">
      {React.Children.map(children, (c, i) => (
        <Item key={i}>{c}</Item>
      ))}
    </Box>
  );
};

export default HorizontalItems;
