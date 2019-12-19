import React from 'react';
import styled from 'styled-components';
import { Heading, Box } from 'grommet';
import HorizontalItems from './HorizontalItems';

export { HorizontalItems };

interface Props {
  title: string;
}

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    margin-bottom: 8px;
  }
`;

const List: React.FC<Props> = ({ title, children }) => {
  return (
    <Box direction="column">
      <Heading level={5} margin={{ bottom: '12px' }}>
        {title}
      </Heading>
      <StyledList>
        {React.Children.map(children, (c, i) => (
          <li key={i}>{c}</li>
        ))}
      </StyledList>
    </Box>
  );
};

export default List;
