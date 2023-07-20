import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    url = 'http://localhost:4000/api/events/'

    constructor(private http: HttpClient) { }

    getEvents(): Observable<any> {
        return this.http.get(this.url);
    }

}