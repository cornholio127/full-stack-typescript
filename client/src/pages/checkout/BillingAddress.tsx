import React from 'react';
import AddressForm, { INITIAL_ADDRESS_VALUES } from './AddressForm';
import { Heading } from 'grommet';

const BillingAddress: React.FC = () => {
  const onSubmit = () => {
    // TODO
  };
  return (
    <>
      <Heading level={3}>Billing address</Heading>
      <AddressForm initialValues={INITIAL_ADDRESS_VALUES} onSubmit={onSubmit} />
    </>
  );
};

export default BillingAddress;
