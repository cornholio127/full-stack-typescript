import React from 'react';
import { Box } from 'grommet';
import Label from './Label';

interface Props {
  label?: string;
}

const Row: React.FC<Props> = ({ label, children }) => {
  return (
    <Box direction="row" align="center" margin={{ bottom: '8px' }}>
      <Box basis="1/3">
        <Label>{label}</Label>
      </Box>
      <Box basis="2/3">{children}</Box>
    </Box>
  );
};

export default Row;
