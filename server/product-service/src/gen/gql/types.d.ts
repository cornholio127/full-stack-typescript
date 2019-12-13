import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type GQLCategory = {
   __typename?: 'Category',
  id: Scalars['ID'],
  name: Scalars['String'],
  products: Array<GQLProduct>,
};

export type GQLImage = {
   __typename?: 'Image',
  id: Scalars['ID'],
  url: Scalars['String'],
  isMain: Scalars['Boolean'],
};

export type GQLPrice = {
   __typename?: 'Price',
  amount: Scalars['String'],
  vatPct: Scalars['String'],
};

export type GQLProduct = {
   __typename?: 'Product',
  id: Scalars['ID'],
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  category: GQLCategory,
  price: GQLPrice,
  images: Array<GQLImage>,
  activationDate: Scalars['String'],
};

export type GQLQuery = {
   __typename?: 'Query',
  products: Array<GQLProduct>,
  categories: Array<GQLCategory>,
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
  Product: ResolverTypeWrapper<GQLProduct>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Category: ResolverTypeWrapper<GQLCategory>,
  Price: ResolverTypeWrapper<GQLPrice>,
  Image: ResolverTypeWrapper<GQLImage>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
  Query: {},
  Product: GQLProduct,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Category: GQLCategory,
  Price: GQLPrice,
  Image: GQLImage,
  Boolean: Scalars['Boolean'],
};

export type GQLCategoryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Category'] = GQLResolversParentTypes['Category']> = {
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  products?: Resolver<Array<GQLResolversTypes['Product']>, ParentType, ContextType>,
};

export type GQLImageResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Image'] = GQLResolversParentTypes['Image']> = {
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  isMain?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>,
};

export type GQLPriceResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Price'] = GQLResolversParentTypes['Price']> = {
  amount?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  vatPct?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
};

export type GQLProductResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Product'] = GQLResolversParentTypes['Product']> = {
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  category?: Resolver<GQLResolversTypes['Category'], ParentType, ContextType>,
  price?: Resolver<GQLResolversTypes['Price'], ParentType, ContextType>,
  images?: Resolver<Array<GQLResolversTypes['Image']>, ParentType, ContextType>,
  activationDate?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
};

export type GQLQueryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = {
  products?: Resolver<Array<GQLResolversTypes['Product']>, ParentType, ContextType>,
  categories?: Resolver<Array<GQLResolversTypes['Category']>, ParentType, ContextType>,
};

export type GQLResolvers<ContextType = any> = {
  Category?: GQLCategoryResolvers<ContextType>,
  Image?: GQLImageResolvers<ContextType>,
  Price?: GQLPriceResolvers<ContextType>,
  Product?: GQLProductResolvers<ContextType>,
  Query?: GQLQueryResolvers<ContextType>,
};


