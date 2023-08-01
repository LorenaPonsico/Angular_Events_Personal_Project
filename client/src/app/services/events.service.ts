import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, map} from "rxjs";
import { Event } from "../models/event";

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    url = 'http://localhost:4000/api/events/'

    constructor(private http: HttpClient) { }

    getEvents(): Observable<any> { // peticiones asincronas
        return this.http.get(this.url);
    }


    deleteEvent(){ }

    createEvent(event: Event): Observable<any>{
        console.log(event)
        return this.http.post(this.url, event)
        // .pipe(
        //     map(() => {
              
        //     }))


    }
}