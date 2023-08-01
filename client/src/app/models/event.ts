export class Event { // O INTERFACE MAS FACIL? CLASS + DE JAVA?
    _id?: number;
    title: string;
    date: string;
    startTime: number;
    endTime: number;
    capacity: number;
    type: string;
    location: string;
    description: string;
    // img?: string;


    constructor(title: string, date: string, startTime: number, endTime: number, capacity:number, location:string, description:string, type:string ) {
        this.title = title;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.capacity = capacity;
        this.type = type;
        this.location = location;
        this.description = description;
        // this.img = img;
    }
}

