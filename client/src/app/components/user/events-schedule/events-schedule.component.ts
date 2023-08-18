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
  wellness:string = Constants.TYPEEVENTS.WELLNESS

  listEvents: Event[] = [];
  userLoginOn: boolean = false;
  user?: User | null;
  eventsByType: { [type: string]: Event[] } = {}; // Objeto para agrupar eventos por tipo
  // categories: string[] = ['Arte', 'Cultura', 'Deporte', 'Gastronomia', 'Infantil', 'Salud y Bienestar'];
  



  constructor( private eventsService: EventsService, private accountService:AccountService ){ }

  ngOnInit(): void {
    this.getEvents();
    this.accountService.user.subscribe((user) => {
          this.user = user;
          this.userLoginOn = !!user; // Convertimos el objeto user en un valor booleano
        });
  }

  getEvents(){
    this.eventsService.getEvents().subscribe(data => {
      // console.log(data);
      this.listEvents = data
      this.groupEventsByType(); 
    }, error => {
      console.log(error);
    })
  }

  groupEventsByType() {
    this.eventsByType = {}; // Reiniciamos el objeto de eventos por tipo
    this.listEvents.forEach((event: Event) => {
      if (this.eventsByType[event.type]) {
        this.eventsByType[event.type].push(event);
        // console.log(this.eventsByType)
      } else {
        this.eventsByType[event.type] = [event];
      }
    });
  }
}
