import React from 'react';
import { Box, Heading, RadioButtonGroup } from 'grommet';
import { Row } from '../../components/form';
import { useFormikContext } from 'formik';
import Icon from '../../components/icon';
import { validate, notEmpty } from '../../validation';
import styled from 'styled-components';

export interface PaymentOptionsValues {
  payBy: string;
}

export const validatePaymentMethod = validate([
  notEmpty<PaymentOptionsValues>('payBy'),
]);

const StyledError = styled.div`
  color: #e80000;
  font-size: 13px;
  font-weight: 500;
`;

const PaymentMethod: React.FC = () => {
  const formik = useFormikContext<PaymentOptionsValues>();
  return (
    <Box>
      <Heading level={3}>Payment method</Heading>
      <Row label={<Icon type="credit-card" size="xlarge" />}>
        <RadioButtonGroup
          name="payBy"
          options={['Credit card', 'Bank transfer']}
          value={formik.values.payBy}
          onChange={formik.handleChange}
        />
        {formik.errors.payBy && (
          <StyledError>
            {((formik.errors.payBy as unknown) as string[])[0]}
          </StyledError>
        )}
      </Row>
    </Box>
  );
};

export default PaymentMethod;
