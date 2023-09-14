import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, map } from "rxjs";
import { Event } from "../models/event";

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    url = 'http://localhost:4000/api/events/'
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
        // this.events.push(event);
        return this.http.post(this.url, event)
    }

    updateEvent(event: Event): Observable<Event> {
        return this.http.put<Event>(`${this.url}${event._id}`, event);
    }


    // Método para cargar la imagen al backend
    uploadImage(image: File): Observable<any> {
        const formData = new FormData();
        formData.append('image', image);

        const uploadUrl = 'http://localhost:4000/api/'; // Reemplaza con la URL real de carga de imágenes en tu backend
        return this.http.post<any>(uploadUrl, formData);
    }

      // Método para obtener la lista de eventos almacenada localmente
    //   getLocalEvents(): Event[] {
    //     return this.events;
    // }
}