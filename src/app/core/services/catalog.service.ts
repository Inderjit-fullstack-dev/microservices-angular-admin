import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { endpoints } from '../constants/routes';
import { ListResponse } from '../interfaces/ListResponse';
import { toQueryString } from '../helpers/utility';
import { ParentProduct, Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  constructor(private http: HttpClient) {}

  getAllCategories(params: any = null): Observable<ListResponse<Category>> {
    return this.http.get<ListResponse<Category>>(
      endpoints.getCategories + toQueryString(params)
    );
  }

  getCategoryDropdown(): Observable<Category[]> {
    return this.http.get<Category[]>(endpoints.getCategoryDropdown);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(endpoints.getCategoryById + id);
  }

  addCategory(data: any): Observable<any> {
    return this.http.post<any>(endpoints.addCategory, data);
  }

  updateCategory(id: number, data: any): Observable<any> {
    return this.http.put<any>(endpoints.updateCategory + id, data);
  }
  deleteCategoryById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(endpoints.deleteCategory + id);
  }

  // products method
  getAllProducts(params: any = null): Observable<ListResponse<Product>> {
    return this.http.get<ListResponse<Product>>(
      endpoints.getProducts + toQueryString(params)
    );
  }

  getProductDropdown(): Observable<ParentProduct[]> {
    return this.http.get<ParentProduct[]>(endpoints.getProductDropdown);
  }

  getSubProducts(id: number): Observable<ListResponse<Product>> {
    return this.http.get<ListResponse<Product>>(endpoints.getSubProducts + id);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(endpoints.getProductById + id);
  }

  getParentProductsByCategoryId(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      endpoints.getParentProductsByCategoryId + id
    );
  }

  addProduct(data: any): Observable<any> {
    return this.http.post<any>(endpoints.addProduct, data);
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this.http.put<any>(endpoints.updateProduct + id, data);
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(endpoints.deleteProduct + id);
  }
}
