import React from 'react';
import { Box } from 'grommet';
import { FormButton } from '../button';

interface Props {
  step: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const Wizard: React.FC<Props> = ({
  children,
  step,
  onPrev,
  onNext,
  onSubmit,
}) => {
  const arr = React.Children.toArray(children);
  return (
    <Box margin={{ top: '16px', bottom: '16px' }}>
      {arr[step]}
      <Box
        direction="row"
        justify="between"
        margin={{ top: '24px', bottom: '24px' }}
      >
        <FormButton
          label="Back"
          icon="chevron-left"
          onClick={onPrev}
          disabled={step === 0}
        />
        {step < arr.length - 1 ? (
          <FormButton
            label="Next"
            icon="chevron-right"
            reverse={true}
            onClick={onNext}
          />
        ) : (
          <FormButton
            label="Submit"
            icon="chevron-right"
            reverse={true}
            onClick={onSubmit}
          />
        )}
      </Box>
    </Box>
  );
};

export default Wizard;
