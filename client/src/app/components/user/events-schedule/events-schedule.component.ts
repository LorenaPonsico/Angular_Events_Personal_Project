import { Component } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { AccountService } from '../../../services/auth-users.service';
import { User } from 'src/app/models/user';
import { Event } from 'src/app/models/event';
import { Constants } from 'src/assets/constants';

@Component({
  selector: 'app-events-schedule',
  templateUrl: './events-schedule.component.html',
  styleUrls: ['./events-schedule.component.css']
})

export class EventsScheduleComponent {
  art: string = Constants.TYPEEVENTS.ART
  culture: string = Constants.TYPEEVENTS.CULTURE
  sport: string = Constants.TYPEEVENTS.SPORT
  gastronomy: string = Constants.TYPEEVENTS.GASTRONOMY
  children: string = Constants.TYPEEVENTS.CHILDREN
  wellness: string = Constants.TYPEEVENTS.WELLNESS

  listEvents: Event[] = [];
  userLoginOn: boolean = false;
  user?: User | null;
  eventsByType: { [type: string]: Event[] } = {}; // Objeto para agrupar eventos por tipo  
  eventsLoaded: boolean = false;

  constructor(
    private eventsService: EventsService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.getEvents();
    this.accountService.user.subscribe((user) => {
      this.user = user;
      this.userLoginOn = !!user; // Convertimos el objeto user en un valor booleano
    });
  }

  getEvents() {
    this.eventsService.getEvents().subscribe(data => {
      this.listEvents = data
      this.groupEventsByType();
      this.eventsLoaded = true;
    }, error => {
      console.log(error);
    })
  }

  groupEventsByType() {
    this.eventsByType = {}; // Reiniciamos el objeto de eventos por tipo
    this.listEvents = this.sortEventsByDate(this.listEvents); // Ordenar eventos por fecha
    const currentDate = new Date(); // Obtener la fecha actual

    this.listEvents.forEach((event: Event) => {
      const eventDate = new Date(event.date);
      // Verificar si la fecha del evento es posterior o igual a la fecha actual
      if (eventDate >= currentDate) {

        if (this.eventsByType[event.type]) {
          this.eventsByType[event.type].push(event);
        } else {
          this.eventsByType[event.type] = [event];
        }
      }
    });
  }

  sortEventsByDate(events: Event[]): Event[] {
    return events.sort((a: Event, b: Event) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  }

}
