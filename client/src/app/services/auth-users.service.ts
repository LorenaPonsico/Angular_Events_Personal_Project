import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/enviroment';
import { User } from '../models/user';
import { LoginRequest } from './loginRequest';

@Injectable({ providedIn: 'root' })
export class AccountService {
    // private userSubject: BehaviorSubject<User | null>;
    // public user: Observable<User | null>;
    url = 'http://localhost:4000/api/users/'

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        // this.user = this.userSubject.asObservable();
    }

    // public get userValue() {
    //     return this.userSubject.value;
    // }

    login(userLogin: LoginRequest):Observable<any> {
       return this.http.get(this.url);
    }

    logout() {
        // remove user from local storage and set current user to null
        // localStorage.removeItem('user');
        // this.userSubject.next(null);
        // this.router.navigate(['/account/login']);
    }
}