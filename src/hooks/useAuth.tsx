import React, { createContext, useCallback, useContext, useMemo } from 'react';

import { useToast } from '@chakra-ui/react';

import { apiFirebase } from '../services/http/api';
import {
  authenticateUser,
  getLoggedUserProfile,
} from '../services/http/modules/users';
import { IUserCredentials } from '../services/http/modules/users/dtos';
import { useStorageState } from './storageState';
import { useNavigate } from 'react-router-dom';

interface IAuthContextData {
  signIn: (authData: IUserCredentials) => Promise<void>;
  loggedUser: ILoggedUser;
  signOut: () => void;
}

interface ILoggedUser {
  id: string;
  name: string;
  token: string;
}

export const LABEL_AUTH_STORAGE = '@BUDGET_APP_AUTH';

const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [loggedUser, setLoggedUser, removeStorage] =
    useStorageState<ILoggedUser>({
      initialValue: {} as ILoggedUser,
      labelStorage: LABEL_AUTH_STORAGE,
    });

  const toast = useToast();

  const signIn = useCallback(
    async ({ email, password }: IUserCredentials) => {
      try {
        const { token } = await authenticateUser({ email, password });

        apiFirebase.defaults.headers.common.Authorization = `Bearer ${token}`;

        const { id, name } = await getLoggedUserProfile();

        setLoggedUser({ id, name, token });
      } catch (error) {
        throw new Error('Error to authenticate user');
      }
    },
    [setLoggedUser]
  );

  const signOut = useCallback(
    () => removeStorage(LABEL_AUTH_STORAGE),
    [removeStorage]
  );

  const authValues = useMemo(
    () => ({ signIn, loggedUser, signOut }),
    [signIn, loggedUser, signOut]
  );

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within AuthProvider');

  return context;
}
