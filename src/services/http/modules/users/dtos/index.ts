export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserAuthenticateResponse {
  token: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}
