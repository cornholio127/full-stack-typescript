import React from 'react';
import { Box } from 'grommet';
import { FormButton } from '../button';
import { useFormikContext } from 'formik';
import Errors from '../error/Errors';
import { Row } from '../form';
import { ApolloError } from 'apollo-boost';

interface Props {
  height?: number;
  step: number;
  onPrev: () => void;
  error?: ApolloError;
}

const Wizard: React.FC<Props> = ({ children, step, onPrev, error, height }) => {
  const arr = React.Children.toArray(children);
  const formik = useFormikContext();
  const submit = () => {
    formik.submitForm();
  };
  return (
    <Box margin={{ top: '16px', bottom: '16px' }}>
      <Box height={height ? height + 'px' : ''}>
        {arr[step]}
        {error && (
          <Row>
            <Errors gql={error} />
          </Row>
        )}
      </Box>
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
            onClick={submit}
          />
        ) : (
          <FormButton
            label="Submit"
            icon="chevron-right"
            reverse={true}
            onClick={submit}
          />
        )}
      </Box>
    </Box>
  );
};

export default Wizard;
