import React from 'react';
import { useCurrentUser, useToken } from './hooks';

const TokenChecker: React.FC = () => {
  const [, error] = useCurrentUser();
  const [, setToken] = useToken();
  if (error) {
    setToken();
  }
  return null;
};

export default TokenChecker;
