import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  listEvents: Event[] = [];
  userLoginOn: boolean = false;
  user?: User | null;
  eventsLoaded: boolean = false;

  constructor(
    private eventsService: EventsService,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEvents();
    this.accountService.user.subscribe((user) => {
      this.user = user;
      this.userLoginOn = !!user; // Convertimos el objeto user en un valor booleano
    });
  }

  getEvents() {
    this.eventsService.getEvents().subscribe((data: Event[]) => {
      // Ordenar los eventos por fecha en orden descendente (eventos más recientes primero)
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      // Obtener solo los primeros 6 eventos (los más recientes)
      this.listEvents = data.slice(0, 6);
      // Establecer eventsLoaded en true para ocultar el spinner
      this.eventsLoaded = true;
    }, error => {
      console.log(error);
    });
  }

  redirectToEvent(index: number) {
    const event = this.listEvents[index];

    if (this.userLoginOn) {
      // Usuario registrado, redirecciona al evento
      this.router.navigate(['/event', event._id]);
    } else {
      // Usuario no registrado, redirecciona a la página de registro
      this.router.navigate(['/registro']);
      this.toastr.info('No estas registrado', 'Para poder ver los eventos tienes que registrarte');
    }
  }
}

