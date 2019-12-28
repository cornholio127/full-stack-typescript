import React from 'react';
import Layout from '../../components/layout';
import { TextInput } from '../../components/input';
import Form, { Row } from '../../components/form';
import { Formik, FormikHelpers } from 'formik';
import { FormButton } from '../../components/button';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import {
  RegisterMutation,
  RegisterMutationVariables,
} from './RegisterMutation';
import { Box } from 'grommet';
import Error from '../../components/error';

interface FormValues {
  email: string;
  password: string;
}

const registerMutation = gql`
  mutation RegisterMutation($user: InsertUserInput!) {
    insertUser(user: $user)
  }
`;

const INITIAL_VALUES: FormValues = { email: '', password: '' };

const Register: React.FC = () => {
  const [register, registerResult] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(registerMutation);
  const onSubmit = (
    user: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    register({ variables: { user } })
      .then(() => setSubmitting(false))
      .catch(() => {
        // do nothing
      });
  };
  return (
    <Layout>
      {registerResult.data ? (
        <Box>Registration successful! {registerResult.data.insertUser}</Box>
      ) : (
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={onSubmit}
          isInitialValid={false}
        >
          {formik => (
            <Form title="Register">
              <Row label="Email">
                <TextInput
                  name="email"
                  value={formik.values.email}
                  placeholder="Email"
                  onChange={formik.handleChange}
                />
              </Row>
              <Row label="Password">
                <TextInput
                  name="password"
                  value={formik.values.password}
                  placeholder="Password"
                  onChange={formik.handleChange}
                  password={true}
                />
              </Row>
              {registerResult.error && (
                <Error
                  message={`Registration failed: ${registerResult.error.message}`}
                />
              )}
              <Row margin={true}>
                <FormButton
                  label="Register"
                  icon="chevron-right"
                  disabled={!formik.isValid || registerResult.loading}
                  onClick={formik.submitForm}
                />
              </Row>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default Register;
