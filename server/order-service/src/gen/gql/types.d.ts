import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  _FieldSet: any,
};






export type GQLOrder = {
   __typename?: 'Order',
  id: Scalars['ID'],
  orderNumber: Scalars['String'],
  orderDate: Scalars['String'],
  orderStatus: GQLOrderStatus,
  items: Array<GQLOrderItem>,
  totalNetAmount: Scalars['String'],
  totalVatAmount: Scalars['String'],
  totalGrossAmount: Scalars['String'],
};

export type GQLOrderItem = {
   __typename?: 'OrderItem',
  id: Scalars['ID'],
  product: GQLProduct,
  quantity: Scalars['Int'],
  netAmount: Scalars['String'],
  vatAmount: Scalars['String'],
  grossAmount: Scalars['String'],
};

export enum GQLOrderStatus {
  Created = 'CREATED',
  Cancelled = 'CANCELLED',
  Paid = 'PAID',
  Shipped = 'SHIPPED'
}

export type GQLProduct = {
   __typename?: 'Product',
  id: Scalars['ID'],
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type ReferenceResolver<TResult, TReference, TContext> = (
      reference: TReference,
      context: TContext,
      info: GraphQLResolveInfo
    ) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type GQLResolversTypes = {
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Product: ResolverTypeWrapper<GQLProduct>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  OrderStatus: GQLOrderStatus,
  Order: ResolverTypeWrapper<GQLOrder>,
  OrderItem: ResolverTypeWrapper<GQLOrderItem>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Product: GQLProduct,
  ID: Scalars['ID'],
  OrderStatus: GQLOrderStatus,
  Order: GQLOrder,
  OrderItem: GQLOrderItem,
  Int: Scalars['Int'],
};

export type GQLProductResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Product'] = GQLResolversParentTypes['Product']> = {
  __resolveReference?: ReferenceResolver<Maybe<GQLResolversTypes['Product']>, { __typename: 'Product' } & Pick<ParentType, 'id'>, ContextType>,

};

export type GQLOrderResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Order'] = GQLResolversParentTypes['Order']> = {
  __resolveReference?: ReferenceResolver<Maybe<GQLResolversTypes['Order']>, { __typename: 'Order' } & Pick<ParentType, 'id'>, ContextType>,
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  orderNumber?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  orderDate?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  orderStatus?: Resolver<GQLResolversTypes['OrderStatus'], ParentType, ContextType>,
  items?: Resolver<Array<GQLResolversTypes['OrderItem']>, ParentType, ContextType>,
  totalNetAmount?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  totalVatAmount?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  totalGrossAmount?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
};

export type GQLOrderItemResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['OrderItem'] = GQLResolversParentTypes['OrderItem']> = {
  __resolveReference?: ReferenceResolver<Maybe<GQLResolversTypes['OrderItem']>, { __typename: 'OrderItem' } & Pick<ParentType, 'id'>, ContextType>,
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  product?: Resolver<GQLResolversTypes['Product'], ParentType, ContextType>,
  quantity?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  netAmount?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  vatAmount?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  grossAmount?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
};

export type GQLResolvers<ContextType = any> = {
  Product?: GQLProductResolvers<ContextType>,
  Order?: GQLOrderResolvers<ContextType>,
  OrderItem?: GQLOrderItemResolvers<ContextType>,
};


