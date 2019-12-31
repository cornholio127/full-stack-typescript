import React from 'react';
import AddressForm from './AddressForm';
import { Heading } from 'grommet';

const ShippingAddress: React.FC = () => {
  return (
    <>
      <Heading level={3}>Shipping address</Heading>
      <AddressForm />
    </>
  );
};

export default ShippingAddress;
