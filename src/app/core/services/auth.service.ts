import { authMicroservice } from './../constants/routes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient
      .post(authMicroservice.login, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          console.log(user);
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    return of({ success: false });
  }
}
