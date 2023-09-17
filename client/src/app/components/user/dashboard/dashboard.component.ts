import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccountService } from '../../../services/auth-users.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';
import { Event } from 'src/app/models/event';
import { ValidationsService } from 'src/app/services/validations.service';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userData: any | null;
  userDetails!: User; // Declarar una variable para almacenar userDetails
  updatedUser!: User;
  showUserForm: boolean = false;
  userForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private validationsService: ValidationsService,
    private fb: FormBuilder,
    private eventsService: EventsService,
    private router: Router) {

    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
      birthDate: ['', [Validators.required, this.validationsService.adult]]

    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  openDialogCustom(template: TemplateRef<any>) {
    this.dialogService.openDialogCustom({
      template
    }).afterClosed().subscribe(res => console.log('Dialog close', res))
  }


  getUsers(): void {
    this.userData = this.accountService.objectValue;
    // Si userData tiene una propiedad user, puedes acceder a los atributos de user

    if (this.userData && this.userData.user) {
      this.userDetails = this.userData.user;
      this.setFormUser(this.userDetails)
    }
  }

  setFormUser(user: User) {
    this.userForm.get('name')?.setValue(user.name);
    this.userForm.get('surname')?.setValue(user.surname);
    this.userForm.get('email')?.setValue(user.email);
    this.userForm.get('phone')?.setValue(user.phone);
    this.userForm.get('birthDate')?.setValue(user.birthDate);
  }


  updateUser(): void {
    const name = this.userForm.get('name')?.value;
    const surname = this.userForm.get('surname')?.value;
    const email = this.userForm.get('email')?.value;
    const phone = this.userForm.get('phone')?.value;
    const birthDate = this.userForm.get('birthDate')?.value;

    this.userDetails.name = name;
    this.userDetails.surname = surname;
    this.userDetails.email = email;
    this.userDetails.phone = phone;
    this.userDetails.birthDate = birthDate;

    if (this.userDetails) {
      if (!this.userDetails._id) {
        // Manejar el caso en el que updatedEvent._id no está definido, si es necesario
        console.error('El ID del usuario no está definido en updatedUser.');
        return;
      }

      this.accountService.updateUser(this.userDetails).subscribe(
        (updatedUser: User | undefined) => {
          if (updatedUser) {
            this.userDetails = updatedUser;
            const userToLocalStorage = {user: updatedUser};
            localStorage.setItem('user', JSON.stringify(userToLocalStorage));

            this.toastr.success('El usuario fue actualizado');
          } else {
            console.error('El usuario no se pudo actualizar');
          }
        },
        (error: any) => {
          console.error('Error al actualizar el usuario:', error);
        }
      );
    }
  }

  navigateEvent(event: Event) {
    if (this.userDetails.events) {
      const eventIndex = this.userDetails.events.indexOf(event);
      if (eventIndex !== -1) {
        this.userDetails.events.splice(eventIndex, 1); // Eliminar el evento del array de eventos del usuario
        // Luego, puedes llamar a la función para actualizar el usuario en el servidor
        this.updateUser();
      }
    }
  }

  deleteUser(id: string) {
    //BORRAR USUARIO DE LA BD
    if (id) {
      this.accountService.deleteUser(id).subscribe(
        () => {
          console.log('Usuario/a eliminado/a:', id);
          this.router.navigate(['/registro']); // Redirige a la página de lista de eventos
          this.toastr.info('El/la usuario/a fue eliminado');
        },
        error => {
          console.error('Error al eliminar el/la usuario/a:', error);
        }
      );
    }
  }

  

}