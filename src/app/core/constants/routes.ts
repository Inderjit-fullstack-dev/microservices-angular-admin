import { environment } from 'src/environments/environment.development';

const baseUrl = environment.baseUrl;

export const authMicroservice = {
  login: `${baseUrl}/auth/login`,
};

export const endpoints = {
  getCategories: `${baseUrl}/Categories/GetCategories`,
  getCategoryById: `${baseUrl}/Categories/GetCategoryById/`,
  addCategory: `${baseUrl}/Categories/addCategory`,
  updateCategory: `${baseUrl}/Categories/updateCategory/`,
};
