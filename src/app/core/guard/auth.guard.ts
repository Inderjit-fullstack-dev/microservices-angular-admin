import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';
import { LoginResponse } from '../interfaces/loginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.authService.currentUser$.pipe(
    //   map((currentUser) => {
    //     if (currentUser) {
    //       return true;
    //     }
    // this.router.navigate(['/auth/signin']);
    // return false;
    //   })
    // );

    var userStrData = localStorage.getItem('user');
    if (userStrData) {
      const user = JSON.parse(userStrData) as LoginResponse;
      if (user && user?.token) {
        return true;
      }
    }

    this.router.navigate(['/auth/signin']);
    return false;
  }
}
