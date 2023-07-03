import { LoginResponse } from './interfaces/loginResponse';

export const getUserData = (): LoginResponse => {
  return JSON.parse(localStorage.getItem('user'));
};
