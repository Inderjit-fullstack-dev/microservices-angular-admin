import { LoginResponse } from '../interfaces/loginResponse';

export const getUserData = (): LoginResponse => {
  return JSON.parse(localStorage.getItem('user'));
};

export const toQueryString = (obj: any) => {
  const objString =
    '?' +
    Object.keys(obj)
      .map((key) => {
        return `${key}=${encodeURIComponent(obj[key])}`;
      })
      .join('&');

  return objString;
};
