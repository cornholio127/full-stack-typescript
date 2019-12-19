import React from 'react';
import Layout from '../../components/layout';
import { Text } from 'grommet';
import { useLocation } from 'react-router';

const Cms: React.FC = () => {
  const location = useLocation();
  return (
    <Layout>
      <h1>CMS</h1>
      <Text>{location.pathname}</Text>
    </Layout>
  );
};

export default Cms;
