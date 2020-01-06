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

export type GQLInsertImageInput = {
  url: Scalars['String'],
  isMain: Scalars['Boolean'],
};

export type GQLInsertProductAttributeInput = {
  typeId: Scalars['ID'],
  value: Scalars['String'],
};

export type GQLInsertProductInput = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  categoryId: Scalars['ID'],
  price: Scalars['String'],
  images: Array<GQLInsertImageInput>,
  specification: Array<GQLInsertProductAttributeInput>,
};

export type GQLMutation = {
   __typename?: 'Mutation',
  insertProduct: Scalars['ID'],
};


export type GQLMutationInsertProductArgs = {
  product: GQLInsertProductInput
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
  specification: Array<GQLProductAttributeCategory>,
};

export type GQLProductAttribute = {
   __typename?: 'ProductAttribute',
  id: Scalars['ID'],
  name: Scalars['String'],
  value: Scalars['String'],
};

export type GQLProductAttributeCategory = {
   __typename?: 'ProductAttributeCategory',
  id: Scalars['ID'],
  name: Scalars['String'],
  attributes: Array<GQLProductAttribute>,
};

export type GQLQuery = {
   __typename?: 'Query',
  productById?: Maybe<GQLProduct>,
  productsById: Array<GQLProduct>,
  searchProducts: Array<GQLProduct>,
  categories: Array<GQLCategory>,
  categoryById?: Maybe<GQLCategory>,
};


export type GQLQueryProductByIdArgs = {
  id: Scalars['ID']
};


export type GQLQueryProductsByIdArgs = {
  ids: Array<Scalars['ID']>
};


export type GQLQuerySearchProductsArgs = {
  categoryId: Scalars['ID'],
  filters?: Maybe<Scalars['String']>,
  orderBy?: Maybe<Scalars['String']>,
  limit: Scalars['Int'],
  offset: Scalars['Int']
};


export type GQLQueryCategoryByIdArgs = {
  id: Scalars['ID']
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
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Product: ResolverTypeWrapper<GQLProduct>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Category: ResolverTypeWrapper<GQLCategory>,
  Price: ResolverTypeWrapper<GQLPrice>,
  Image: ResolverTypeWrapper<GQLImage>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  ProductAttributeCategory: ResolverTypeWrapper<GQLProductAttributeCategory>,
  ProductAttribute: ResolverTypeWrapper<GQLProductAttribute>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Mutation: ResolverTypeWrapper<{}>,
  InsertProductInput: GQLInsertProductInput,
  InsertImageInput: GQLInsertImageInput,
  InsertProductAttributeInput: GQLInsertProductAttributeInput,
};

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
  Query: {},
  ID: Scalars['ID'],
  Product: GQLProduct,
  String: Scalars['String'],
  Category: GQLCategory,
  Price: GQLPrice,
  Image: GQLImage,
  Boolean: Scalars['Boolean'],
  ProductAttributeCategory: GQLProductAttributeCategory,
  ProductAttribute: GQLProductAttribute,
  Int: Scalars['Int'],
  Mutation: {},
  InsertProductInput: GQLInsertProductInput,
  InsertImageInput: GQLInsertImageInput,
  InsertProductAttributeInput: GQLInsertProductAttributeInput,
};

export type GQLQueryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = {
  productById?: Resolver<Maybe<GQLResolversTypes['Product']>, ParentType, ContextType, RequireFields<GQLQueryProductByIdArgs, 'id'>>,
  productsById?: Resolver<Array<GQLResolversTypes['Product']>, ParentType, ContextType, RequireFields<GQLQueryProductsByIdArgs, 'ids'>>,
  searchProducts?: Resolver<Array<GQLResolversTypes['Product']>, ParentType, ContextType, RequireFields<GQLQuerySearchProductsArgs, 'categoryId' | 'limit' | 'offset'>>,
  categories?: Resolver<Array<GQLResolversTypes['Category']>, ParentType, ContextType>,
  categoryById?: Resolver<Maybe<GQLResolversTypes['Category']>, ParentType, ContextType, RequireFields<GQLQueryCategoryByIdArgs, 'id'>>,
};

export type GQLProductResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Product'] = GQLResolversParentTypes['Product']> = {
  __resolveReference?: ReferenceResolver<Maybe<GQLResolversTypes['Product']>, { __typename: 'Product' } & Pick<ParentType, 'id'>, ContextType>,
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  category?: Resolver<GQLResolversTypes['Category'], ParentType, ContextType>,
  price?: Resolver<GQLResolversTypes['Price'], ParentType, ContextType>,
  images?: Resolver<Array<GQLResolversTypes['Image']>, ParentType, ContextType>,
  activationDate?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  specification?: Resolver<Array<GQLResolversTypes['ProductAttributeCategory']>, ParentType, ContextType>,
};

export type GQLCategoryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Category'] = GQLResolversParentTypes['Category']> = {
  __resolveReference?: ReferenceResolver<Maybe<GQLResolversTypes['Category']>, { __typename: 'Category' } & Pick<ParentType, 'id'>, ContextType>,
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  products?: Resolver<Array<GQLResolversTypes['Product']>, ParentType, ContextType>,
};

export type GQLPriceResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Price'] = GQLResolversParentTypes['Price']> = {
  amount?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  vatPct?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
};

export type GQLImageResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Image'] = GQLResolversParentTypes['Image']> = {
  __resolveReference?: ReferenceResolver<Maybe<GQLResolversTypes['Image']>, { __typename: 'Image' } & Pick<ParentType, 'id'>, ContextType>,
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  isMain?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>,
};

export type GQLProductAttributeCategoryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ProductAttributeCategory'] = GQLResolversParentTypes['ProductAttributeCategory']> = {
  __resolveReference?: ReferenceResolver<Maybe<GQLResolversTypes['ProductAttributeCategory']>, { __typename: 'ProductAttributeCategory' } & Pick<ParentType, 'id'>, ContextType>,
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  attributes?: Resolver<Array<GQLResolversTypes['ProductAttribute']>, ParentType, ContextType>,
};

export type GQLProductAttributeResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ProductAttribute'] = GQLResolversParentTypes['ProductAttribute']> = {
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  value?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
};

export type GQLMutationResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Mutation'] = GQLResolversParentTypes['Mutation']> = {
  insertProduct?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType, RequireFields<GQLMutationInsertProductArgs, 'product'>>,
};

export type GQLResolvers<ContextType = any> = {
  Query?: GQLQueryResolvers<ContextType>,
  Product?: GQLProductResolvers<ContextType>,
  Category?: GQLCategoryResolvers<ContextType>,
  Price?: GQLPriceResolvers<ContextType>,
  Image?: GQLImageResolvers<ContextType>,
  ProductAttributeCategory?: GQLProductAttributeCategoryResolvers<ContextType>,
  ProductAttribute?: GQLProductAttributeResolvers<ContextType>,
  Mutation?: GQLMutationResolvers<ContextType>,
};


