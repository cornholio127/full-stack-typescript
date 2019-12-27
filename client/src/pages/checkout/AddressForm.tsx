import React from 'react';
import { Formik } from 'formik';
import Form, { Row } from '../../components/form';
import { TextInput } from '../../components/input';

export interface AddressValues {
  firstName: string;
  lastName: string;
  companyName: string;
  street: string;
  zipCode: string;
  city: string;
}

export const INITIAL_ADDRESS_VALUES: AddressValues = {
  firstName: '',
  lastName: '',
  companyName: '',
  street: '',
  zipCode: '',
  city: '',
};

interface Props {
  initialValues: AddressValues;
  onSubmit: () => void;
}

const AddressForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      isInitialValid={false}
    >
      {formik => (
        <Form>
          <Row label="First name">
            <TextInput
              name="firstName"
              value={formik.values.firstName}
              placeholder="First name"
              onChange={formik.handleChange}
            />
          </Row>
          <Row label="Last name">
            <TextInput
              name="lastName"
              value={formik.values.lastName}
              placeholder="Last name"
              onChange={formik.handleChange}
            />
          </Row>
          <Row label="Company name">
            <TextInput
              name="companyName"
              value={formik.values.companyName}
              placeholder="Company name"
              onChange={formik.handleChange}
            />
          </Row>
          <Row label="Street">
            <TextInput
              name="street"
              value={formik.values.street}
              placeholder="Street"
              onChange={formik.handleChange}
            />
          </Row>
          <Row label="Zip code">
            <TextInput
              name="zipCode"
              value={formik.values.zipCode}
              placeholder="Zip code"
              onChange={formik.handleChange}
            />
          </Row>
          <Row label="City">
            <TextInput
              name="city"
              value={formik.values.city}
              placeholder="City"
              onChange={formik.handleChange}
            />
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default AddressForm;
