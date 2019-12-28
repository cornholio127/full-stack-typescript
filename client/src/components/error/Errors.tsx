import React from 'react';
import { ApolloError } from 'apollo-boost';
import Error from '.';
import { Box } from 'grommet';

interface Props {
  gql: ApolloError;
}

const Errors: React.FC<Props> = ({ gql }) => {
  return (
    <Box>
      {gql.graphQLErrors.map((err, i) => (
        <Error key={i} message={err.message} />
      ))}
    </Box>
  );
};

export default Errors;
