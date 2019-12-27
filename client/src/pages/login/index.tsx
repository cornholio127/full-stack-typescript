import React from 'react';
import Layout from '../../components/layout';
import { TextInput } from '../../components/input';
import Form, { Row } from '../../components/form';
import { Formik } from 'formik';
import { FormButton } from '../../components/button';

interface FormValues {
  email: string;
  password: string;
}

const INITIAL_VALUES: FormValues = { email: '', password: '' };

const Login: React.FC = () => {
  const submitLogin = () => {
    // TODO
  };
  return (
    <Layout>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={submitLogin}
        isInitialValid={false}
      >
        {formik => (
          <Form title="Login">
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
            <Row margin={true}>
              <FormButton
                label="Submit"
                icon="chevron-right"
                disabled={!formik.isValid}
              />
            </Row>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Login;
