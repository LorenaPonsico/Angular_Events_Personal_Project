import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerError: string = "";

  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    phone: ['', Validators.required],
    birthday: ['', Validators.required],
    // img: ['', Validators.required]

  })

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService) { }


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
      // const img = this.registerForm.get("img")?.value;

      this.accountService.register(name, surname, email, password, phone, birthday).subscribe({
        next: (userData) => {
          console.log(userData, "register");
        },
        error: (errorData) => {
          console.error(errorData);
          this.registerError = errorData;
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

