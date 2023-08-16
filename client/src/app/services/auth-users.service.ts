import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/enviroment';
import { LoginRequest } from './loginRequest';

@Injectable({ providedIn: 'root' })
export class AccountService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  currentUserLoginOn: any;
  currentUserData: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(email: any, password: any) {
    const body = { email: email, password: password };
    return this.http.post<User>(`${environment.apiUrl}/api/users/iniciar-sesion`, body)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user)
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(name: any, surname: any, email: any, password: any, phone: any, birthday: any) {
    const body = { name: name, surname: surname, email: email, password: password, phone: phone, birthDate: birthday }
    return this.http.post(`${environment.apiUrl}/api/users/registro`, body)
      .pipe(
        map(() => {
          
        }))
  }
}
