import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  listEvents: Event[] = [];
  userLoginOn: boolean = false;
  user?: User | null;
  

  constructor( private eventsService: EventsService, private accountService: AccountService){}

  ngOnInit(): void {
    this.getEvents();
    this.accountService.user.subscribe((user) => {
          this.user = user;
          this.userLoginOn = !!user; // Convertimos el objeto user en un valor booleano
        });
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



// userLoginOn: boolean = false;
// user?: User | null;


// constructor(private accountService: AccountService) {}

// ngOnInit(): void {
//   this.accountService.user.subscribe((user) => {
//     this.user = user;
//     this.userLoginOn = !!user; // Convertimos el objeto user en un valor booleano
//   });
// }