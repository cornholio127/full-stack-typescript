import React from 'react';
import { Box } from 'grommet';
import Label from './Label';

interface Props {
  label?: string | JSX.Element;
  margin?: boolean;
}

const Row: React.FC<Props> = ({ label, margin = false, children }) => {
  return (
    <Box
      direction="row"
      align="center"
      margin={{ bottom: '8px', top: margin ? '16px' : '0' }}
    >
      <Box basis="1/3">
        <Label>{label}</Label>
      </Box>
      <Box basis="2/3">{children}</Box>
    </Box>
  );
};

export default Row;
