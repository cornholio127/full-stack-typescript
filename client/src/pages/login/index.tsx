import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/layout';
import { TextInput } from '../../components/input';
import Form, { Row } from '../../components/form';
import { Formik, FormikHelpers } from 'formik';
import { FormButton } from '../../components/button';
import { Box } from 'grommet';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { LoginMutation, LoginMutationVariables } from './LoginMutation';
import Errors from '../../components/error/Errors';
import { useToken } from '../../hooks';

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

const loginMutation = gql`
  mutation LoginMutation($cred: LoginInput!) {
    login(cred: $cred)
  }
`;

const INITIAL_VALUES: FormValues = { email: '', password: '' };

const Login: React.FC = () => {
  const [, setToken] = useToken();
  const history = useHistory();
  const location = useLocation();
  const [login, loginResult] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(loginMutation);
  const onSubmit = (
    cred: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    login({ variables: { cred } })
      .then(result => {
        setSubmitting(false);
        if (result.data) {
          setToken(result.data?.login);
          const params = new URLSearchParams(location.search);
          const r = params.get('r');
          if (r) {
            history.replace(r);
          } else {
            history.push('/');
          }
        }
      })
      .catch(() => {
        // do nothing
      });
  };
  if (loginResult.error) {
    console.log(loginResult.error.graphQLErrors[0].message);
  }
  return (
    <Layout>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={onSubmit}
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
            {loginResult.error && (
              <Row>
                <Errors gql={loginResult.error} />
              </Row>
            )}
            <Row margin={true}>
              <FormButton
                label="Login"
                icon="chevron-right"
                disabled={!formik.isValid || loginResult.loading}
                onClick={formik.submitForm}
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
