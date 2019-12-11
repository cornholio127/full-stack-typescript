import { GQLQueryResolvers, GQLMutationResolvers } from '../types';

export const userByEmail: GQLQueryResolvers['userByEmail'] = (source, args, context, info) => {
  const { email } = args;
  return null;
};

export const upsertUser: GQLMutationResolvers['upsertUser'] = (source, args, context, info) => {
  const { user } = args;
  return '1';
};
