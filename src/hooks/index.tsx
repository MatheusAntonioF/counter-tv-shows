import React from 'react';

import { AuthProvider } from './useAuth';
import { TVShowProvider } from './useTvShow';

const CustomHookProviders: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <TVShowProvider>{children}</TVShowProvider>
    </AuthProvider>
  );
};

export default CustomHookProviders;
