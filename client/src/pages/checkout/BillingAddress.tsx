import React from 'react';
import AddressForm from './AddressForm';
import { Heading } from 'grommet';

const BillingAddress: React.FC = () => {
  return (
    <>
      <Heading level={3}>Billing address</Heading>
      <AddressForm />
    </>
  );
};

export default BillingAddress;
