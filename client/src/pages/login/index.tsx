import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/layout';
import { TextInput } from '../../components/input';
import Form, { Row } from '../../components/form';
import { Formik } from 'formik';
import { FormButton } from '../../components/button';
import { Box } from 'grommet';
import { NavLink } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
}

const StyledLink = styled(NavLink)`
  color: #123456;
  &:hover {
    color: ${props => props.theme.global?.colors?.brand};
  }
`;

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
                label="Login"
                icon="chevron-right"
                disabled={!formik.isValid}
              />
            </Row>
            <Box
              direction="row"
              justify="center"
              pad="24px"
              margin={{ top: '48px' }}
              border={{ side: 'top', size: '1px', color: '#123456' }}
            >
              Don't have an account yet?&nbsp;
              <StyledLink to="/register">Register now!</StyledLink>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Login;
