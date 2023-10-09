import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Event } from "../models/event";

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    url = 'https://angular-back-three.vercel.app/api/events'
    events: Event[] = []; 

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

    createEvent(event: Event): Observable<any> {
        console.log(event)
        return this.http.post(this.url, event)
    }

    updateEvent(event: Event): Observable<Event> {
        return this.http.put<Event>(`${this.url}${event._id}`, event);
    }

}