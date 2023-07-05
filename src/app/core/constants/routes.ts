import { environment } from 'src/environments/environment.development';

const baseUrl = environment.baseUrl;

export const authMicroservice = {
  login: `${baseUrl}/auth/login`,
};

export const endpoints = {
  getCategories: `${baseUrl}/Categories/GetCategories`,
  getCategoryDropdown: `${baseUrl}/Categories/GetCategoryDropdown`,
  getCategoryById: `${baseUrl}/Categories/GetCategoryById/`,
  addCategory: `${baseUrl}/Categories/addCategory`,
  updateCategory: `${baseUrl}/Categories/updateCategory/`,
  deleteCategory: `${baseUrl}/Categories/Delete/`,

  //products

  getProducts: `${baseUrl}/Products/GetAllProducts`,
  getProductDropdown: `${baseUrl}/Products/GetProductDropdown`,
  getParentProductsByCategoryId: `${baseUrl}/Products/GetParentProductsByCategoryId/`,
  getProductById: `${baseUrl}/Products/GetProductById/`,
  getSubProducts: `${baseUrl}/Products/GetSubProducts/`,
  addProduct: `${baseUrl}/Products/AddProduct`,
  updateProduct: `${baseUrl}/Products/UpdateProduct/`,
  deleteProduct: `${baseUrl}/Products/DeleteProduct/`,
};
