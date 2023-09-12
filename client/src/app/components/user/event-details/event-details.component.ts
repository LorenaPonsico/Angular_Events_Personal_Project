import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Event } from 'src/app/models/event';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services';
import { DialogService } from 'src/app/services/dialog.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: Event | undefined;
  // showDeleteConfirmationModal: boolean = false;
  updatedEvent!: Event;
  showEventForm: boolean = false;
  eventForm: FormGroup = new FormGroup({
    title: new FormControl(),
    date: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl(),
    capacity: new FormControl(),
    type: new FormControl(),
    location: new FormControl(),
    description: new FormControl(),
  });

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private dialogService: DialogService) { }
  // private fb: FormBuilder,

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const eventId = params.get('eventId');
      if (eventId) {
        this.getEventDetails(eventId);
      }
    });
  }

  openDialogCustom(template: TemplateRef<any>) {
    this.dialogService.openDialogCustom({
      template
    }).afterClosed().subscribe(res => console.log('Dialog close', res))
  }


  setFormEvent(event: Event) {
    this.eventForm.get('title')?.setValue(event.title);
    this.eventForm.get('date')?.setValue(event.date);
    this.eventForm.get('startTime')?.setValue(event.startTime);
    this.eventForm.get('endTime')?.setValue(event.endTime);
    this.eventForm.get('capacity')?.setValue(event.capacity);
    this.eventForm.get('type')?.setValue(event.type);
    this.eventForm.get('location')?.setValue(event.location);
    this.eventForm.get('description')?.setValue(event.description);
  }

  getEventDetails(eventId: string): void {
    this.eventsService.getEventById(eventId).subscribe(
      (event: Event) => {
        this.event = event;
        this.updatedEvent = { ...event };
        this.setFormEvent(this.updatedEvent);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteEvent(): void {
    if (this.event?._id) {
      // this.showDeleteConfirmationModal = true; 

      const eventId = this.event._id.toString(); // Convertir el _id a cadena
      const eventTitle = this.event.title; // Obtener el título del evento o un valor predeterminado
      this.eventsService.deleteEvent(eventId).subscribe(
        () => {
          console.log('Evento eliminado:', eventTitle);
          this.router.navigate(['/ver-eventos']); // Redirige a la página de lista de eventos
          this.toastr.info('El evento fue eliminado');
        },
        error => {
          console.error('Error al eliminar el evento:', error);
        }
      );
    }
  }

  updateEvent(): void {
    const title = this.eventForm.get('title')?.value;
    const date = this.eventForm.get('date')?.value;
    const startTime = this.eventForm.get('startTime')?.value;
    const endTime = this.eventForm.get('endTime')?.value;
    const capacity = this.eventForm.get('capacity')?.value;
    const type = this.eventForm.get('type')?.value;
    const location = this.eventForm.get('location')?.value;
    const description = this.eventForm.get('description')?.value;

    this.updatedEvent.title = title;
    this.updatedEvent.date = date;
    this.updatedEvent.startTime = startTime;
    this.updatedEvent.endTime = endTime;
    this.updatedEvent.capacity = capacity;
    this.updatedEvent.type = type;
    this.updatedEvent.location = location;
    this.updatedEvent.description = description;

    if (this.updatedEvent) {
      if (!this.updatedEvent._id) {
        // Manejar el caso en el que updatedEvent._id no está definido, si es necesario
        console.error('El ID del evento no está definido en updatedEvent.');
        return;
      }

      this.eventsService.updateEvent(this.updatedEvent).subscribe(
        (updatedEvent: Event | undefined) => {
          if (updatedEvent) {
            this.event = updatedEvent;
            this.toastr.success('El evento fue actualizado');
          } else {
            console.error('El evento no se pudo actualizar');
          }
        },
        (error: any) => {
          console.error('Error al actualizar el evento:', error);
        }
      );
    }
  }


  getCurrentUser = () => {
    const currentObject = this.accountService.objectValue;
    const currentUser: User = currentObject.user;
    return currentUser;
  }

  joinEvent(): void {
    if (this.event?._id) {
      const currentUser = this.getCurrentUser();

      if (!currentUser.events) {
        // Asegúrate de que currentUser.event esté inicializado
        currentUser.events = currentUser.events || [];
        currentUser.events.push(this.event);
        this.accountService.updateUser(currentUser).subscribe(
          () => {
            this.router.navigate(['/panel-control']); // Redirige a la página deseada
          },
          error => {
            console.error('Error al agregar el evento:', error);
          }
        );
      } else {
        // Verifica si el evento ya está en el array antes de agregarlo
        if (!currentUser?.events.some(ev => ev._id === this.event!._id)) {
          // Agrega el evento al array de eventos del usuario
          currentUser.events.push(this.event);
          console.log("Aquí", currentUser);

          this.accountService.updateUser(currentUser).subscribe(
            () => {
              this.router.navigate(['/panel-control']); // Redirige a la página deseada
            },
            error => {
              console.error('Error al agregar el evento:', error);
            }
          );
        } else {
          console.log('El evento ya está en el array de eventos del usuario');
        }
      }
    }
  }

}

