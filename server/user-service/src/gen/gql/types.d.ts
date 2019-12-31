import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  _FieldSet: any,
};






export type GQLActivateUserInput = {
  email: Scalars['String'],
  token: Scalars['String'],
};

export type GQLAddress = {
   __typename?: 'Address',
  id: Scalars['ID'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  companyName?: Maybe<Scalars['String']>,
  street: Scalars['String'],
  zipCode: Scalars['String'],
  city: Scalars['String'],
  country: Scalars['String'],
};

export type GQLAddressInput = {
  id?: Maybe<Scalars['ID']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  companyName?: Maybe<Scalars['String']>,
  street: Scalars['String'],
  zipCode: Scalars['String'],
  city: Scalars['String'],
  country: Scalars['String'],
};

export type GQLCountry = {
   __typename?: 'Country',
  id: Scalars['ID'],
  code: Scalars['String'],
  name: Scalars['String'],
};

export type GQLInsertUserInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type GQLLoginInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type GQLMutation = {
   __typename?: 'Mutation',
  insertUser: Scalars['ID'],
  updateUser: Scalars['Boolean'],
  activateUser: Scalars['Boolean'],
  login: Scalars['String'],
};


export type GQLMutationInsertUserArgs = {
  user: GQLInsertUserInput
};


export type GQLMutationUpdateUserArgs = {
  user: GQLUpdateUserInput
};


export type GQLMutationActivateUserArgs = {
  activation: GQLActivateUserInput
};


export type GQLMutationLoginArgs = {
  cred?: Maybe<GQLLoginInput>
};

export type GQLQuery = {
   __typename?: 'Query',
  user?: Maybe<GQLUser>,
  countries: Array<GQLCountry>,
};

export type GQLUpdateUserInput = {
  billingAddress?: Maybe<GQLAddressInput>,
  shippingAddress?: Maybe<GQLAddressInput>,
};

export type GQLUser = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  billingAddress?: Maybe<GQLAddress>,
  shippingAddress?: Maybe<GQLAddress>,
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
  Query: ResolverTypeWrapper<{}>,
  User: ResolverTypeWrapper<GQLUser>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Address: ResolverTypeWrapper<GQLAddress>,
  Country: ResolverTypeWrapper<GQLCountry>,
  Mutation: ResolverTypeWrapper<{}>,
  InsertUserInput: GQLInsertUserInput,
  UpdateUserInput: GQLUpdateUserInput,
  AddressInput: GQLAddressInput,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  ActivateUserInput: GQLActivateUserInput,
  LoginInput: GQLLoginInput,
};

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
  Query: {},
  User: GQLUser,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Address: GQLAddress,
  Country: GQLCountry,
  Mutation: {},
  InsertUserInput: GQLInsertUserInput,
  UpdateUserInput: GQLUpdateUserInput,
  AddressInput: GQLAddressInput,
  Boolean: Scalars['Boolean'],
  ActivateUserInput: GQLActivateUserInput,
  LoginInput: GQLLoginInput,
};

export type GQLQueryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = {
  user?: Resolver<Maybe<GQLResolversTypes['User']>, ParentType, ContextType>,
  countries?: Resolver<Array<GQLResolversTypes['Country']>, ParentType, ContextType>,
};

export type GQLUserResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['User'] = GQLResolversParentTypes['User']> = {
  __resolveReference?: ReferenceResolver<Maybe<GQLResolversTypes['User']>, { __typename: 'User' } & Pick<ParentType, 'id'>, ContextType>,
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  billingAddress?: Resolver<Maybe<GQLResolversTypes['Address']>, ParentType, ContextType>,
  shippingAddress?: Resolver<Maybe<GQLResolversTypes['Address']>, ParentType, ContextType>,
};

export type GQLAddressResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Address'] = GQLResolversParentTypes['Address']> = {
  __resolveReference?: ReferenceResolver<Maybe<GQLResolversTypes['Address']>, { __typename: 'Address' } & Pick<ParentType, 'id'>, ContextType>,
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  firstName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  lastName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  companyName?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  street?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  zipCode?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  city?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  country?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
};

export type GQLCountryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Country'] = GQLResolversParentTypes['Country']> = {
  __resolveReference?: ReferenceResolver<Maybe<GQLResolversTypes['Country']>, { __typename: 'Country' } & Pick<ParentType, 'id'>, ContextType>,
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  code?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
};

export type GQLMutationResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Mutation'] = GQLResolversParentTypes['Mutation']> = {
  insertUser?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType, RequireFields<GQLMutationInsertUserArgs, 'user'>>,
  updateUser?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLMutationUpdateUserArgs, 'user'>>,
  activateUser?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLMutationActivateUserArgs, 'activation'>>,
  login?: Resolver<GQLResolversTypes['String'], ParentType, ContextType, GQLMutationLoginArgs>,
};

export type GQLResolvers<ContextType = any> = {
  Query?: GQLQueryResolvers<ContextType>,
  User?: GQLUserResolvers<ContextType>,
  Address?: GQLAddressResolvers<ContextType>,
  Country?: GQLCountryResolvers<ContextType>,
  Mutation?: GQLMutationResolvers<ContextType>,
};


