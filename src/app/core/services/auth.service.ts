import { authMicroservice } from './../constants/routes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, map, of } from 'rxjs';
import { LoginResponse } from '../interfaces/loginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSource = new ReplaySubject<LoginResponse>(1);

  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string) {
    return this.httpClient
      .post(authMicroservice.login, {
        username,
        password,
      })
      .pipe(
        map((loginResponse: LoginResponse) => {
          if (loginResponse) {
            localStorage.setItem('user', JSON.stringify(loginResponse));
            this.currentUserSource.next(loginResponse);
          }
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    return of({ success: false });
  }
}
