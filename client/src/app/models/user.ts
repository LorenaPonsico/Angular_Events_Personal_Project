export class User {
    name: string;
    surname?: string;
    email?: string;
    password?: string;
    phone?: string;
    birthDate?: string;
    img?: string;
    token: any;

    constructor( name: string, surname: string,  email: string,  password: string,    phone: string,   birthDate: string,
    img: string   ){

    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.birthDate = birthDate;
    this.img = img;

    }
}

