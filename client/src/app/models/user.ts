import { Event } from './event';

export class User {
    _id: string;
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    phone?: string;
    birthDate?: string;
    img?: string;
    token: any;
    events?: Event[];

    constructor( id: string, name: string, surname: string,  email: string,  password: string,    phone: string,   birthDate: string,
    img: string, events: Event[]   ){
    this._id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.birthDate = birthDate;
    this.img = img;
    this.events = events


    }
}

