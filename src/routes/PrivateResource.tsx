import React from 'react';

import { Navigate } from 'react-router-dom';

import Layout from '../components/Layout';

import { useAuth } from '../hooks/useAuth';

interface IPrivateResourceProps {
  children: JSX.Element;
}

const PrivateResource = ({ children }: IPrivateResourceProps): JSX.Element => {
  const {
    loggedUser: { id: loggedUserId },
  } = useAuth();

  return !!loggedUserId ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate to="/" replace />
  );
};

export { PrivateResource };
