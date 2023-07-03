import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { endpoints } from '../constants/routes';
import { ListResponse } from '../interfaces/ListResponse';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<ListResponse<Category>> {
    return this.http.get<ListResponse<Category>>(endpoints.getCategories);
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
}
