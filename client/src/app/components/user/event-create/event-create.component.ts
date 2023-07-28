import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent {
  eventForm: FormGroup

  constructor( private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      capacity: ['', Validators.required],
      type: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],





    })
  }


  createEvent(){
    console.log(this.eventForm)
  }
} 
