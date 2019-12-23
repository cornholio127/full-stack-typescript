import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

interface Props {
  label: string;
}

const Label = styled(Box)`
  font-weight: 600;
`;

const DetailsRow: React.FC<Props> = ({ label, children }) => {
  return (
    <Box
      direction="row"
      pad={{ top: '8px', bottom: '8px' }}
      margin={{ bottom: '16px' }}
      border={{ size: '1px', color: '#123456', side: 'top' }}
    >
      <Label basis="1/3">{label}</Label>
      <Box basis="2/3">{children}</Box>
    </Box>
  );
};

export default DetailsRow;
