import { LoginResponse } from './../interfaces/loginResponse';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  token?: string;
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var userStrData = localStorage.getItem('user');
    if (userStrData) {
      const user = JSON.parse(userStrData) as LoginResponse;
      if (user && user?.token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      }
    }
    return next.handle(request);
  }
}
