import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services';

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    loginError: string = ""; 

    loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    })


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private accountService: AccountService
    ) {}

    ngOnInit() {
      
    }

    get email() {
        return this.loginForm.controls.email;
    }

    get password() {
        return this.loginForm.controls.password;
    }

    login() {
        if (this.loginForm.valid) {

            const email = this.loginForm.get("email")?.value;
            const password = this.loginForm.get("password")?.value;
            this.accountService.login(email, password).subscribe({
                next: (userData) => {
                    console.log(userData, "login");
                },
                error: (errorData) => {
                    console.error(errorData);
                    this.loginError = errorData;
                },
                complete: () => {
                    console.log('Login Completo')
                    this.router.navigateByUrl('/panel-control')
                    this.loginForm.reset()
                }
            });

        }
        else {
            alert('error al ingresar datos')
            this.loginForm.markAllAsTouched()
        }
        }
    }
