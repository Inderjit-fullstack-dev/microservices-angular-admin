import { environment } from 'src/environments/environment.development';

const baseUrl = environment.baseUrl;

export const authMicroservice = {
  login: `${baseUrl}/auth/login`,
  signup: `${baseUrl}/auth/signup`,
};
