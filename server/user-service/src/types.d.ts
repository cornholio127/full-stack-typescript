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
  country: GQLCountry,
};

export type GQLAddressInput = {
  id?: Maybe<Scalars['ID']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  companyName?: Maybe<Scalars['String']>,
  street: Scalars['String'],
  zipCode: Scalars['String'],
  city: Scalars['String'],
  countryCode: Scalars['String'],
};

export type GQLCountry = {
   __typename?: 'Country',
  id: Scalars['ID'],
  code: Scalars['String'],
  name: Scalars['String'],
};

export type GQLMutation = {
   __typename?: 'Mutation',
  upsertUser: Scalars['ID'],
  upsertAddress: Scalars['ID'],
};


export type GQLMutationUpsertUserArgs = {
  user: GQLUserInput
};


export type GQLMutationUpsertAddressArgs = {
  address: GQLAddressInput
};

export type GQLQuery = {
   __typename?: 'Query',
  userByEmail: Array<GQLUser>,
  countries: Array<GQLCountry>,
};


export type GQLQueryUserByEmailArgs = {
  email: Scalars['String']
};

export type GQLUser = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  billingAddress?: Maybe<GQLAddress>,
  shippingAddress?: Maybe<GQLAddress>,
};

export type GQLUserInput = {
  id?: Maybe<Scalars['ID']>,
  email: Scalars['String'],
  billingAddress?: Maybe<GQLAddressInput>,
  shippingAddress?: Maybe<GQLAddressInput>,
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
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
  String: ResolverTypeWrapper<Scalars['String']>,
  User: ResolverTypeWrapper<GQLUser>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Address: ResolverTypeWrapper<GQLAddress>,
  Country: ResolverTypeWrapper<GQLCountry>,
  Mutation: ResolverTypeWrapper<{}>,
  UserInput: GQLUserInput,
  AddressInput: GQLAddressInput,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  User: GQLUser,
  ID: Scalars['ID'],
  Address: GQLAddress,
  Country: GQLCountry,
  Mutation: {},
  UserInput: GQLUserInput,
  AddressInput: GQLAddressInput,
  Boolean: Scalars['Boolean'],
};

export type GQLAddressResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Address'] = GQLResolversParentTypes['Address']> = {
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  firstName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  lastName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  companyName?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  street?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  zipCode?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  city?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  country?: Resolver<GQLResolversTypes['Country'], ParentType, ContextType>,
};

export type GQLCountryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Country'] = GQLResolversParentTypes['Country']> = {
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  code?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
};

export type GQLMutationResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Mutation'] = GQLResolversParentTypes['Mutation']> = {
  upsertUser?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType, RequireFields<GQLMutationUpsertUserArgs, 'user'>>,
  upsertAddress?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType, RequireFields<GQLMutationUpsertAddressArgs, 'address'>>,
};

export type GQLQueryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = {
  userByEmail?: Resolver<Array<GQLResolversTypes['User']>, ParentType, ContextType, RequireFields<GQLQueryUserByEmailArgs, 'email'>>,
  countries?: Resolver<Array<GQLResolversTypes['Country']>, ParentType, ContextType>,
};

export type GQLUserResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['User'] = GQLResolversParentTypes['User']> = {
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  billingAddress?: Resolver<Maybe<GQLResolversTypes['Address']>, ParentType, ContextType>,
  shippingAddress?: Resolver<Maybe<GQLResolversTypes['Address']>, ParentType, ContextType>,
};

export type GQLResolvers<ContextType = any> = {
  Address?: GQLAddressResolvers<ContextType>,
  Country?: GQLCountryResolvers<ContextType>,
  Mutation?: GQLMutationResolvers<ContextType>,
  Query?: GQLQueryResolvers<ContextType>,
  User?: GQLUserResolvers<ContextType>,
};


