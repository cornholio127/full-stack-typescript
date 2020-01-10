import React from 'react';
import { Box, Heading, Markdown } from 'grommet';
import { useParams } from 'react-router';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { LocationQuery, LocationQueryVariables } from './LocationQuery';
import Layout from '../../components/layout';

interface RouteParams {
  slug: string;
}

const locationQuery = gql`
  query LocationQuery($slug: String!) {
    cms {
      locations(where: { slug: $slug }) {
        name
        description
        image {
          mime
          url
        }
        hours_of_operation {
          day_interval
          opening_hours
          closing_hours
        }
      }
    }
  }
`;

const Location: React.FC = () => {
  const { slug } = useParams<RouteParams>();
  const { data } = useQuery<LocationQuery, LocationQueryVariables>(
    locationQuery,
    {
      variables: {
        slug,
      },
      fetchPolicy: 'cache-first',
    }
  );
  const location =
    (data && data.cms && data.cms.locations && data.cms.locations[0]) ||
    undefined;
  return (
    <Layout>
      <Box width="720px" margin="0 auto">
        {location && (
          <>
            <Heading level={2}>{location.name}</Heading>
            {location.image?.url && (
              <img
                src={location.image.url}
                alt={location.name}
                width="720"
                height="auto"
              />
            )}
            <Markdown style={{ maxWidth: 'inherit' }}>
              {location.description}
            </Markdown>
            <Heading level={4}>Hours of operation</Heading>
            {location.hours_of_operation?.map((h, i) => (
              <Box key={i} direction="row">
                <Box basis="1/3">{h?.day_interval}</Box>
                <Box basis="2/3">
                  {h?.opening_hours}
                  {h?.closing_hours && ' - ' + h.closing_hours}
                </Box>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Location;
