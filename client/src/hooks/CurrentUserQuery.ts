/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUserQuery
// ====================================================

export interface CurrentUserQuery_user_billingAddress {
  __typename: "Address";
  firstName: string;
  lastName: string;
  companyName: string | null;
  street: string;
  zipCode: string;
  city: string;
  country: string;
}

export interface CurrentUserQuery_user_shippingAddress {
  __typename: "Address";
  firstName: string;
  lastName: string;
  companyName: string | null;
  street: string;
  zipCode: string;
  city: string;
  country: string;
}

export interface CurrentUserQuery_user {
  __typename: "User";
  id: string;
  email: string;
  billingAddress: CurrentUserQuery_user_billingAddress | null;
  shippingAddress: CurrentUserQuery_user_shippingAddress | null;
}

export interface CurrentUserQuery {
  user: CurrentUserQuery_user | null;
}
