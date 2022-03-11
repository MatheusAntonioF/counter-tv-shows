import { AxiosRequestConfig } from 'axios';
import { ILoggedUser, LABEL_AUTH_STORAGE } from '../../../hooks/useAuth';

const persistTokenInAuthenticatedRequest = (request: AxiosRequestConfig) => {
  if (request.headers?.Authorization) return request;

  const { token }: ILoggedUser = JSON.parse(
    String(localStorage.getItem(LABEL_AUTH_STORAGE))
  );

  if (request.headers) request.headers['Authorization'] = `Bearer ${token}`;

  return request;
};

export { persistTokenInAuthenticatedRequest };
