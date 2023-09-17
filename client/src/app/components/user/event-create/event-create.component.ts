import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Event } from 'src/app/models/event';
import { DialogService } from 'src/app/services/dialog.service';
import { EventsService } from 'src/app/services/events.service';
import { AccountService } from 'src/app/services'; // Importa el AccountService aquí
import { User } from 'src/app/models/user';
import { ValidationsService } from 'src/app/services/validations.service';

// interface InputEvent extends Event {
//   target: HTMLInputElement & EventTarget;
// }
@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent {
  eventForm: FormGroup;
  // file: File | undefined;
  // photoSelected: string | ArrayBuffer | undefined

  constructor(
    private fb: FormBuilder,
    private router: Router, // Asegúrate de tener esto
    private toastr: ToastrService, // Asegúrate de tener esto
    private eventService: EventsService,
    private dialogService: DialogService,
    private validationsService: ValidationsService,
    private accountService: AccountService) {

    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', [Validators.required, this.validationsService.validateDateNotPast]],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      capacity: ['', [Validators.required, this.validationsService.nonNegativeNumberValidator]],
      type: ['', Validators.required],
      location: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  // onPhotoSelected(input: HTMLInputElement): void {
  //   if (input.files && input.files[0]) {
  //     this.file = input.files[0];
  //     // Vista previa de imágenes
  //     const reader = new FileReader();
  //     reader.onload = e => this.photoSelected = reader.result as string;

  //     reader.readAsDataURL(this.file);
  //   }
  // }


  openDialogCustom(template: TemplateRef<any>) {
    this.dialogService.openDialogCustom({
      template
    }).afterClosed().subscribe(res => console.log('Dialog close', res))
  }


  createEvent() {
    if (this.eventForm.invalid) {
      return;
    }
    const userLocalStorage: any = JSON.parse(localStorage.getItem('user')!)

    const EVENT: Event = {
      title: this.eventForm.get('title')?.value,
      date: this.eventForm.get('date')?.value,
      startTime: this.eventForm.get('startTime')?.value,
      endTime: this.eventForm.get('endTime')?.value,
      capacity: this.eventForm.get('capacity')?.value,
      type: this.eventForm.get('type')?.value,
      location: this.eventForm.get('location')?.value,
      description: this.eventForm.get('description')?.value,
      creatorId: userLocalStorage.user._id
    };
    console.log(EVENT)
    this.saveEvent(EVENT, userLocalStorage);

    // QUIERO QUE LA PERSONA QUE CREA EL EVENTO SE LE AÑADA EL EVENTO DIRECTAMENTE EN SU DASHBOARD (ESTO NO FUNCIONA!!)
    // this.accountService.updateUser(this.currentUser).subscribe(
    //   (updatedUser: User | undefined) => {
    //     if (updatedUser) {
    //       this.userDetails = updatedUser;
    //       this.toastr.success('El usuario fue actualizado');
    //     } else {
    //       console.error('El usuario no se pudo actualizar');
    //     }
    //   },
    //   (error: any) => {
    //     console.error('Error al actualizar el usuario:', error);
    //   }
    // );



  }

  public saveEvent(event: Event, userLocalStorage: any) {
    event.registeredParticipants = [];
    //Añadimos al array de registeredParticipants el id del usuario actual
    event.registeredParticipants?.push(userLocalStorage.user._id);

    this.eventService.createEvent(event).subscribe(
      (event) => {
        //Hacemos un update de User para actualizar su array de events y meter el event actual
        let user: User = userLocalStorage.user;
        if(user.events?.length){
          user.events.push(event);
          this.setUserToLocalStorage(userLocalStorage.user);
          this.accountService.updateUser(userLocalStorage.user).subscribe(
            () => {
            },
            error => {
              console.error('Error al agregar el evento:', error);
            }
          );
        }else{
          user.events = [];
          user.events.push(event);
          this.setUserToLocalStorage(userLocalStorage.user);
          this.accountService.updateUser(userLocalStorage.user).subscribe(
            () => {
            },
            error => {
              console.error('Error al agregar el evento:', error);
            }
          );
        }
        //Hacer update de usuario con el evento en events
        this.toastr.success('El evento fue creado con éxito', 'Evento subido!'); // Utiliza Toastr para mostrar mensaje de éxito
        this.router.navigate(['/ver-eventos']); // Utiliza Router para navegar después de crear el evento
      },
      error => {
        console.error(error);
        this.toastr.error('Error al crear el evento'); // Utiliza Toastr para mostrar mensaje de error
      }
    );
  }

  setUserToLocalStorage(user: User) {
    //Seteamos el user actualizado en el localStorage para tenerlo actualizado
    const userToLocalStorage = { user: user };
    debugger
    localStorage.setItem('user', JSON.stringify(userToLocalStorage));
  }
}
