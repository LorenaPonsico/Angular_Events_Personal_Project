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
  currentUserLoginOn: any; //??
  currentUserData: any;//??

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

  login(email: any, password: any): Observable<User> {
    const body = { email: email, password: password };
    return this.http.post<User>(`${environment.apiUrl}/api/users/iniciar-sesion`, body)
      .pipe(
        map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user)
          return user;
        }),
        catchError((error: HttpErrorResponse) => {
          // Handle error here (e.g., show an error message)
          return throwError(error);
        })
      );
  }
  

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(name: any, surname: any, email: any, password: any, phone: any, birthday: any): Observable<void> {
    const body = { name: name, surname: surname, email: email, password: password, phone: phone, birthDate: birthday }
    return this.http.post<void>(`${environment.apiUrl}/api/users/registro`, body)
      .pipe(
        map(() => {
          // You can navigate to a login page or do something else after successful registration
        }),
        catchError((error: HttpErrorResponse) => {
          // Handle error here (e.g., show an error message)
          return throwError(error);
        })
      );
  }
  

  updateUser(user: User): Observable<User> {
    console.log(user)
    return this.http.put<User>(`${environment.apiUrl}/api/users/${user._id}`, user);
  }
  
}
