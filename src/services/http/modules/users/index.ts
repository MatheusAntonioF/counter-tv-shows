import { apiFirebase } from '../../api';
import { IUserCredentials, IUserAuthenticateResponse, IUser } from './dtos';

export async function authenticateUser({
  email,
  password,
}: IUserCredentials): Promise<IUserAuthenticateResponse> {
  const { data } = await apiFirebase.post<IUserAuthenticateResponse>(
    '/session/sign-in',
    {
      email,
      password,
    }
  );

  return data;
}

export async function getLoggedUserProfile(): Promise<IUser> {
  const { data } = await apiFirebase.get('/users/me');

  return data;
}
