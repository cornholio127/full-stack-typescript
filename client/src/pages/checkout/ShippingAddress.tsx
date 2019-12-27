import React from 'react';
import AddressForm, { INITIAL_ADDRESS_VALUES } from './AddressForm';
import { Heading } from 'grommet';

const ShippingAddress: React.FC = () => {
  const onSubmit = () => {
    // TODO
  };
  return (
    <>
      <Heading level={3}>Shipping address</Heading>
      <AddressForm initialValues={INITIAL_ADDRESS_VALUES} onSubmit={onSubmit} />
    </>
  );
};

export default ShippingAddress;
