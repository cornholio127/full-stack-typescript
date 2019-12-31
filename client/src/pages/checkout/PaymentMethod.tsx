import React from 'react';
import { Box, Heading, RadioButtonGroup } from 'grommet';
import { Row } from '../../components/form';
import { useFormikContext } from 'formik';
import Icon from '../../components/icon';
import { validate, notEmpty } from '../../validation';

export interface PaymentOptionsValues {
  payBy: string;
}

export const validatePaymentMethod = validate([
  notEmpty<PaymentOptionsValues>('payBy'),
]);

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
      </Row>
    </Box>
  );
};

export default PaymentMethod;
