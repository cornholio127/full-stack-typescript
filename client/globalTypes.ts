/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OrderStatus {
  CANCELLED = "CANCELLED",
  CREATED = "CREATED",
  PAID = "PAID",
  SHIPPED = "SHIPPED",
}

export interface AddressInput {
  id?: string | null;
  firstName: string;
  lastName: string;
  companyName?: string | null;
  street: string;
  zipCode: string;
  city: string;
  country: string;
}

export interface InsertUserInput {
  email: string;
  password: string;
}

export interface ItemInput {
  productId: string;
  quantity: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdateUserInput {
  billingAddress?: AddressInput | null;
  shippingAddress?: AddressInput | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
