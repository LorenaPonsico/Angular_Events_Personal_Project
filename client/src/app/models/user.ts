import { Event } from './event';

export class User {
    id: string;
    name: string;
    surname?: string;
    email?: string;
    password?: string;
    phone?: string;
    birthDate?: string;
    img?: string;
    token: any;
    event?: Event[];

    constructor( id: string, name: string, surname: string,  email: string,  password: string,    phone: string,   birthDate: string,
    img: string, event: Event[]   ){
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.birthDate = birthDate;
    this.img = img;
    this.event = event


    }
}

