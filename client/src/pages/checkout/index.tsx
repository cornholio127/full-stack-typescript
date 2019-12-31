import React, { useState, useEffect } from 'react';
import { Box, Heading } from 'grommet';
import Layout from '../../components/layout';
import Process from '../../components/process';
import Wizard from 'src/components/wizard';
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';
import PaymentMethod, { validatePaymentMethod } from './PaymentMethod';
import Summary from './Summary';
import { useHistory } from 'react-router';
import { useCurrentUser, useBasket } from '../../hooks';
import {
  CurrentUserQuery_user_shippingAddress as UserBillingAddress,
  CurrentUserQuery_user_billingAddress as UserShippingAddress,
} from '../../hooks/CurrentUserQuery';
import {
  AddressValues,
  INITIAL_ADDRESS_VALUES,
  validateAddress,
} from './AddressForm';
import { Formik, FormikValues, FormikHelpers } from 'formik';
import { AnyValidationFunction } from 'src/validation';
import { gql, ApolloError } from 'apollo-boost';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import {
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from './UpdateUserMutation';
import { UpdateUserInput } from 'globalTypes';
import {
  OrderSummaryQuery,
  OrderSummaryQueryVariables,
  OrderSummaryQuery_orderSummary as OrderSummary,
} from './OrderSummaryQuery';

const toAddressValues = (
  addr: UserBillingAddress | UserShippingAddress | null | undefined
): AddressValues | undefined => {
  if (!addr) {
    return undefined;
  }
  return {
    firstName: addr.firstName,
    lastName: addr.lastName,
    companyName: addr.companyName || '',
    street: addr.street,
    zipCode: addr.zipCode,
    city: addr.city,
    country: addr.country,
  };
};

const updateUserMutation = gql`
  mutation UpdateUserMutation($user: UpdateUserInput!) {
    updateUser(user: $user)
  }
`;

const orderSummaryQuery = gql`
  query OrderSummaryQuery($items: [ItemInput!]!) {
    orderSummary(items: $items) {
      items {
        id
        product {
          name
        }
        quantity
        grossAmount
      }
      totalGrossAmount
    }
  }
`;

const Checkout: React.FC = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [step, setStep] = useState(0);
  const [submissionError, setSubmissionError] = useState<ApolloError>();
  const [user, error] = useCurrentUser();
  const [basket] = useBasket();
  const [orderSummary, setOrderSummary] = useState<OrderSummary>();
  useEffect(() => {
    if (error) {
      history.replace(`/login?r=${encodeURIComponent('/checkout')}`);
    }
  }, [history, error]);
  let initialValues: FormikValues = {};
  let validate: AnyValidationFunction = undefined;
  switch (step) {
    case 0:
      initialValues =
        toAddressValues(user?.shippingAddress) || INITIAL_ADDRESS_VALUES;
      validate = validateAddress;
      break;
    case 1:
      initialValues =
        toAddressValues(user?.billingAddress) || INITIAL_ADDRESS_VALUES;
      validate = validateAddress;
      break;
    case 2:
      validate = validatePaymentMethod;
      break;
  }
  const [updateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(updateUserMutation);
  const submitAddressStep = (
    user: UpdateUserInput,
    helpers: FormikHelpers<FormikValues>
  ) => {
    updateUser({
      variables: { user },
    })
      .then(result => {
        if (result.data && result.data.updateUser === true) {
          helpers.resetForm();
          setSubmissionError(undefined);
          setStep(step => step + 1);
        }
      })
      .catch(setSubmissionError)
      .finally(() => helpers.setSubmitting(false));
  };
  const onSubmit = (
    values: FormikValues,
    helpers: FormikHelpers<FormikValues>
  ) => {
    switch (step) {
      case 0:
        submitAddressStep(
          { shippingAddress: values as AddressValues },
          helpers
        );
        break;
      case 1:
        submitAddressStep({ billingAddress: values as AddressValues }, helpers);
        break;
      case 2:
        helpers.resetForm();
        setStep(step => step + 1);
        client
          .query<OrderSummaryQuery, OrderSummaryQueryVariables>({
            query: orderSummaryQuery,
            variables: {
              items: basket.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          })
          .then(result => setOrderSummary(result.data.orderSummary))
          .catch(console.log);
        break;
    }
  };
  return (
    <Layout>
      <Box width="720px" margin="0 auto">
        <Box direction="row" align="center">
          <Box basis="1/3">
            <Heading level={2}>Checkout</Heading>
          </Box>
          <Box basis="2/3">
            <Process steps={4} currentStep={step + 1} />
          </Box>
        </Box>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={onSubmit}
          isInitialValid={false}
          validate={validate}
          validateOnChange={false}
        >
          <Wizard
            step={step}
            onPrev={() => setStep(step => step - 1)}
            error={submissionError}
            height={440}
          >
            <ShippingAddress />
            <BillingAddress />
            <PaymentMethod />
            <Summary data={orderSummary} />
          </Wizard>
        </Formik>
      </Box>
    </Layout>
  );
};

export default Checkout;
