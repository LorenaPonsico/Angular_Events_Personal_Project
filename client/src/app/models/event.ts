export class Event {
    _id?: string;
    creatorId?: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    capacity: number;
    registeredParticipants?: string[];
    type: string;
    location: string;
    description: string;
    // imageURL?: string;
    // users: string[];
    // img?: string;


    constructor(title: string, date: string, startTime: string, endTime: string, capacity:number, registeredParticipants: string[], location:string, description:string, type:string ) {
        this.title = title;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.capacity = capacity;
        this.registeredParticipants = registeredParticipants;
        this.type = type;
        this.location = location;
        this.description = description;
        // this.users = [];
        // this.img = img;
    }
}

