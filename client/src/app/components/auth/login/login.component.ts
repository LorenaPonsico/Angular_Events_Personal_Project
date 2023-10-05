import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services';
import { ToastrService } from 'ngx-toastr';

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
        private accountService: AccountService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {}

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

                    if (typeof errorData.error === 'string') {
                        // Si errorData.error es una cadena de texto, es probable que sea el mensaje de error.
                        this.loginError = errorData.error;
                    } else if (errorData.error && errorData.error.message) {
                        // Si errorData.error.message existe, asumimos que es el mensaje de error.
                        this.loginError = errorData.error.message;
                    } else {
                        // Si no se puede determinar el mensaje de error, mostrar un mensaje genérico.
                        this.loginError = 'Hubo un error en el inicio de sesión';
                    }
                },
                complete: () => {
                    console.log('Login Completo')
                    this.router.navigateByUrl('/panel-control')
                    this.loginForm.reset()
                    this.toastr.info('Sesion iniciada', 'Has iniciado sesion correctamente');

                }
            });

        }
        else {
            alert('error al ingresar datos')
            this.loginForm.markAllAsTouched()
        }
    }
}
