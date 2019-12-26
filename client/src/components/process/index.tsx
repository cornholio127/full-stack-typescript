import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
import ProcessStep from './ProcessStep';

interface Props {
  steps: number;
  currentStep: number;
}

const Container = styled(Box)`
  position: relative;
`;

const LineContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Line = styled.div`
  width: 100%;
  height: 4px;
  box-sizing: border-box;
  margin: 0 20px;
  background: #123456;
`;

const Process: React.FC<Props> = ({ steps, currentStep }) => {
  return (
    <Container>
      <LineContainer>
        <Line />
      </LineContainer>
      <Box direction="row" justify="between">
        {[...Array(steps).keys()].map(i => (
          <ProcessStep
            key={i}
            label={'' + (i + 1)}
            status={
              i + 1 === currentStep
                ? 'active'
                : i + 1 < currentStep
                ? 'completed'
                : 'open'
            }
          />
        ))}
      </Box>
    </Container>
  );
};

export default Process;
