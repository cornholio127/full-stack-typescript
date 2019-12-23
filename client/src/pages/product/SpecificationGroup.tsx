import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
import { ProductDetails_productById_specification_attributes as Attribute } from './ProductDetails';

interface Props {
  title: string;
  attributes: Attribute[];
}

const Title = styled(Box)`
  font-weight: 600;
  padding: 8px 0;
`;

const AttrRow = styled(Box)`
  border-top: 1px solid #eaeaed;
  padding: 8px 0;
`;

const Value = styled(Box)`
  color: #123456;
`;

const SpecificationGroup: React.FC<Props> = ({ title, attributes }) => {
  return (
    <Box margin={{ bottom: '16px' }}>
      <Title>{title}</Title>
      {attributes.map((attr, i) => (
        <AttrRow key={i} direction="row">
          <Box basis="1/2">{attr.name}</Box>
          <Value basis="1/2">{attr.value}</Value>
        </AttrRow>
      ))}
    </Box>
  );
};

export default SpecificationGroup;
