import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  listEvents: Event[] = [];

  constructor( private eventsService: EventsService){}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(){
    this.eventsService.getEvents().subscribe(data => {
      console.log(data);
      this.listEvents = data
      // console.log(this.listEvents)
    }, error => {
      console.log(error);
    })
  }
}
