import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Event } from 'src/app/models/event';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: Event | undefined;
  showDeleteConfirmationModal: boolean = false;
  // listEvents: Event[] =[];
  // user: User[] = [];


  constructor(private route: ActivatedRoute, private eventsService: EventsService, private accountService: AccountService,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const eventId = params.get('eventId');
      if (eventId) {
        this.getEventDetails(eventId);
      }
    });
  }

  getEventDetails(eventId: string): void {
    this.eventsService.getEventById(eventId).subscribe(
      (event: Event) => {
        this.event = event;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteEvent(): void {
    if (this.event?._id) {
      this.showDeleteConfirmationModal = true; // Mostrar el modal de confirmación primero

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
        debugger
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
          debugger
          console.log("Aquí",currentUser);

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

