import React, { useState } from 'react';
import { Box, Heading } from 'grommet';
import Layout from '../../components/layout';
import Process from '../../components/process';
import Wizard from 'src/components/wizard';
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';
import PaymentMethod from './PaymentMethod';
import Summary from './Summary';
import { useHistory } from 'react-router';
import { useToken } from '../../hooks';

const Checkout: React.FC = () => {
  const history = useHistory();
  const [token] = useToken();
  const [step, setStep] = useState(0);
  if (!token) {
    history.replace(`/login?r=${encodeURIComponent('/checkout')}`);
  }
  const onSubmit = () => {
    // TODO
  };
  return (
    <Layout>
      <Box width="720px" margin="0 auto">
        <Box direction="row" align="center">
          <Box basis="1/3">
            <Heading level={2}>Checkout</Heading>
          </Box>
          <Box basis="2/3">
            <Process steps={4} currentStep={step + 1} />
          </Box>
        </Box>
        <Wizard
          step={step}
          onPrev={() => setStep(step - 1)}
          onNext={() => setStep(step + 1)}
          onSubmit={onSubmit}
        >
          <ShippingAddress />
          <BillingAddress />
          <PaymentMethod />
          <Summary />
        </Wizard>
      </Box>
    </Layout>
  );
};

export default Checkout;
