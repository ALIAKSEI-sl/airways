import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, catchError, Observable, of } from 'rxjs';

import { UserCreate, UserLogin, UserResponse } from '../model/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userName$ = new BehaviorSubject('Sign in');

  isLogged$ = new BehaviorSubject(false);

  isLoginPageVisible$ = new BehaviorSubject(false);

  userName: Observable<string>;

  isLogged: Observable<boolean>;

  isLoginPageVisible: Observable<boolean>;

  isBadRequest = false;

  isChangeHeightMain = false;

  selected = {
    oder: 0,
  };

  constructor(private http: HttpClient) {
    this.userName = this.userName$.asObservable();
    this.isLogged = this.isLogged$.asObservable();
    this.isLoginPageVisible = this.isLoginPageVisible$.asObservable();
  }

  checkLogIn() {
    const token = localStorage.getItem('userAirwaysToken');
    const name = localStorage.getItem('userAirwaysName');
    if (token && name) {
      this.isLogged$.next(true);
      this.userName$.next(name);
    }
  }

  isUserLoggedIn() {
    const token = localStorage.getItem('userAirwaysToken');
    const name = localStorage.getItem('userAirwaysName');
    return token && name ? true : false;
  }

  loginInUser(user: UserLogin) {
    const url = 'https://bored-puce-seahorse.cyclic.app//login';
    this.http
      .post<UserResponse>(url, user)
      .pipe(
        catchError(() => {
          return of(null);
        })
      )
      .subscribe((newUser) => {
        if (newUser) {
          localStorage.setItem('userAirwaysToken', newUser.accessToken);
          localStorage.setItem('userAirwaysName', newUser.user.firstName);
          localStorage.setItem('userAirwaysId', newUser.user.id.toString());
          this.userName$.next(newUser.user.firstName);
          this.isLoginPageVisible$.next(false);
          this.isBadRequest = false;
        } else {
          this.isBadRequest = true;
        }
      });
  }

  createUser(user: UserCreate) {
    const url = 'https://bored-puce-seahorse.cyclic.app//register';
    this.http.post<UserResponse>(url, user).subscribe((newUser) => {
      localStorage.setItem('userAirwaysToken', newUser.accessToken);
      localStorage.setItem('userAirwaysName', newUser.user.firstName);
      localStorage.setItem('userAirwaysId', newUser.user.id.toString());
      this.userName$.next(newUser.user.firstName);
    });
  }

  logOut() {
    localStorage.removeItem('userAirwaysToken');
    localStorage.removeItem('userAirwaysName');
    localStorage.removeItem('userAirwaysId');
    this.userName$.next('Sign in');
    this.isLoginPageVisible$.next(true);
  }
}
