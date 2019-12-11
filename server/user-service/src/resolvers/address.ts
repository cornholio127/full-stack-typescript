import { GQLMutationResolvers } from '../types';

export const upsertAddress: GQLMutationResolvers['upsertAddress'] = (source, args, context, info) => {
  const { address } = args;
  return '1';
};
