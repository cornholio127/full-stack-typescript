import React from 'react';
import { Box } from 'grommet';
import Layout from '../../components/layout';
import Process from '../../components/process';
import AddressForm, { AddressValues } from './AddressForm';

const INITIAL_ADDRESS_VALUES: AddressValues = {
  firstName: '',
  lastName: '',
  companyName: '',
  street: '',
  zipCode: '',
  city: '',
};

const Checkout: React.FC = () => {
  const onNext = () => {
    // TODO
  };
  return (
    <Layout>
      <Box width="720px" margin="0 auto">
        <Process steps={4} currentStep={1} />
        <AddressForm
          title="Checkout &mdash; Shipping address"
          initialValues={INITIAL_ADDRESS_VALUES}
          onSubmit={onNext}
        />
      </Box>
    </Layout>
  );
};

export default Checkout;
