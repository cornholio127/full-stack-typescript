import React from 'react';
import { useFormikContext } from 'formik';
import Form, { Row } from '../../components/form';
import { TextInput } from '../../components/input';
import { validate, notEmpty } from '../../validation';

export interface AddressValues {
  firstName: string;
  lastName: string;
  companyName: string;
  street: string;
  zipCode: string;
  city: string;
  country: string;
}

export const INITIAL_ADDRESS_VALUES: AddressValues = {
  firstName: '',
  lastName: '',
  companyName: '',
  street: '',
  zipCode: '',
  city: '',
  country: 'CHE',
};

export const validateAddress = validate([
  notEmpty<AddressValues>('firstName'),
  notEmpty<AddressValues>('lastName'),
  notEmpty<AddressValues>('street'),
  notEmpty<AddressValues>('zipCode'),
  notEmpty<AddressValues>('city'),
]);

const AddressForm: React.FC = () => {
  const formik = useFormikContext<AddressValues>();
  return (
    <Form>
      <Row label="First name">
        <TextInput
          name="firstName"
          value={formik.values.firstName || ''}
          placeholder="First name"
          onChange={formik.handleChange}
          errors={formik.errors.firstName}
        />
      </Row>
      <Row label="Last name">
        <TextInput
          name="lastName"
          value={formik.values.lastName || ''}
          placeholder="Last name"
          onChange={formik.handleChange}
          errors={formik.errors.lastName}
        />
      </Row>
      <Row label="Company name">
        <TextInput
          name="companyName"
          value={formik.values.companyName || ''}
          placeholder="Company name"
          onChange={formik.handleChange}
          errors={formik.errors.companyName}
        />
      </Row>
      <Row label="Street">
        <TextInput
          name="street"
          value={formik.values.street || ''}
          placeholder="Street"
          onChange={formik.handleChange}
          errors={formik.errors.street}
        />
      </Row>
      <Row label="Zip code">
        <TextInput
          name="zipCode"
          value={formik.values.zipCode || ''}
          placeholder="Zip code"
          onChange={formik.handleChange}
          errors={formik.errors.zipCode}
        />
      </Row>
      <Row label="City">
        <TextInput
          name="city"
          value={formik.values.city || ''}
          placeholder="City"
          onChange={formik.handleChange}
          errors={formik.errors.city}
        />
      </Row>
    </Form>
  );
};

export default AddressForm;
