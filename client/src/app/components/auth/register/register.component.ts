import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl  } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services';
import { ValidationsService } from 'src/app/services/validations.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  registerError: string = "";

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    surname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
    birthday: ['', [Validators.required, this.validationsService.adult]]

    // img: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService,
    private validationsService: ValidationsService,
    ) { }


  get name() {
    return this.registerForm.controls.name;
  }
  get surname() {
    return this.registerForm.controls.surname;
  }
  get email() {
    return this.registerForm.controls.email;
  }
  get password() {
    return this.registerForm.controls.password;
  }
  get phone() {
    return this.registerForm.controls.phone;
  }
  get birthday() {
    return this.registerForm.controls.birthday;
  }


  registerUser() {
    console.log('Valores del formulario:', this.registerForm.value);
    if (this.registerForm.valid) {
      const name = this.registerForm.get("name")?.value;
      const surname = this.registerForm.get("surname")?.value;
      const email = this.registerForm.get("email")?.value;
      const password = this.registerForm.get("password")?.value;
      const phone = this.registerForm.get("phone")?.value;
      const birthday = this.registerForm.get("birthday")?.value;
      this.accountService.register(name, surname, email, password, phone, birthday).subscribe({
        next: (userData) => {
        },
        error: (errorData) => {
          console.error(errorData);
          this.registerError = errorData;
          if (errorData.error && errorData.error.message === 'El correo electrónico ya está registrado') {
            // El correo ya existe en la base de datos, muestra un mensaje al usuario.
            this.toastr.error('El correo electrónico ya está registrado', 'Error de registro');
            this.registerError = 'El correo electrónico ya está registrado';
          } else {
            // Otro error, muestra un mensaje de error genérico.
            this.toastr.error('Hubo un error en el registro', 'Error de registro');
            this.registerError = 'Hubo un error en el registro';
          }
        },
        complete: () => {
          this.accountService.login(email,password).subscribe({
            next: (userData) => {
            },
            error: (errorData) => {
              console.error(errorData);
            },
            complete: () => {
              this.router.navigateByUrl('/panel-control')
              this.toastr.info('Sesion iniciada', 'Te has registrado correctamente');

            }
          });
          this.registerForm.reset()
        }
      });

    }
    else {
      alert('error al ingresar datos')
      this.registerForm.markAllAsTouched()
    }
  }
}

