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

    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(this.url);
    }

    getEventById(eventId: string): Observable<Event> {
        return this.http.get<Event>(`${this.url}/${eventId}`);
    }

    deleteEvent(eventId: string): Observable<any> {
        return this.http.delete(`${this.url}/${eventId}`);
    }

    createEvent(event: Event): Observable<any>{
        console.log(event)
        return this.http.post(this.url, event)
    }
}