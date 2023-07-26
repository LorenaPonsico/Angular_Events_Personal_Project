export class Event { // O INTERFACE MAS FACIL? CLASS + DE JAVA?
    _id?: number;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    description: string;
    type: string;
    img?: string;

    constructor(title: string, date: string, startTime: string, endTime: string, location:string, description:string, type:string, img:string  ) {
        this.title = title;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.description = description;
        this.type = type;
        // this.img = img;

    }
}

