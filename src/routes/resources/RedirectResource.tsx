import React from 'react';

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const RedirectResource = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const {
    loggedUser: { id: loggedUserId },
  } = useAuth();

  return loggedUserId ? <Navigate to="/list-shows" /> : children;
};

export default RedirectResource;
