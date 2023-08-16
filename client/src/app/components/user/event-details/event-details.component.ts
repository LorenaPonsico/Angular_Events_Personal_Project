import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: Event | undefined;
  listEvents: Event[] =[]

  constructor(private route: ActivatedRoute, private eventsService: EventsService) { }

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
}

