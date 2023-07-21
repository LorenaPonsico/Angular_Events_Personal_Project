import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/services';
import { LoginRequest } from 'src/app/services/loginRequest';

// import { AccountService } from '@app/services'

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    })


    constructor(
        private formBuilder: FormBuilder,
        // private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService
        // private accountService: AccountService
    ) {
        // redirect to home if already logged in
        // if (this.accountService.userValue) {
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        // this.form = this.formBuilder.group({
        //     username: ['', Validators.required],
        //     password: ['', Validators.required]
        // });
    }

    get email() {
        return this.loginForm.controls.email;
    }

    get password() {
        return this.loginForm.controls.password;
    }

    login() {
        if (this.loginForm.valid) {
            this.accountService.login(this.loginForm.value as LoginRequest).subscribe({
                next: (userData) => {
                    console.log(userData);
                },
                error: (errorData) => {
                    console.error(errorData);
                },
                complete: () => {
                    console.log('Login Completo')
                }
            });
            this.router.navigateByUrl('/inicio')
            this.loginForm.reset()
        }
        else {
            alert('error al ingresar datos')
            this.loginForm.markAllAsTouched()
        }
    }

    // convenience getter for easy access to form fields
    // get f() { return this.form.controls; }

    // onSubmit() {
    //     this.submitted = true;

    // reset alert on submit
    // this.error = '';

    // stop here if form is invalid
    // if (this.form.invalid) {
    //     return;
    // }

    // this.loading = true;
    // this.accountService.login(this.f.username.value, this.f.password.value)
    //     .pipe(first())
    //     .subscribe({
    //         next: () => {
    //             // get return url from query parameters or default to home page
    //             const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //             this.router.navigateByUrl(returnUrl);
    //         },
    //         error: error => {
    //             this.error = error;
    //             this.loading = false;
    //         }
    //     });
    // }
}