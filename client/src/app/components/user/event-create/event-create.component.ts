import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent {
  eventForm: FormGroup

  constructor(private fb: FormBuilder,
              private router: Router) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      capacity: ['', Validators.required],
      type: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  createEvent(){
    // console.log(this.eventForm)
    const EVENT: Event = {
      title: this.eventForm.get('title')?.value,
      date: this.eventForm.get('date')?.value,
      startTime: this.eventForm.get('startTime')?.value,
      endTime: this.eventForm.get('endTime')?.value,
      capacity: this.eventForm.get('capacity')?.value,
      type: this.eventForm.get('type')?.value,
      location: this.eventForm.get('location')?.value,
      description: this.eventForm.get('description')?.value,
    }
    console.log(EVENT)
    this.router.navigate(['/ver-eventos'])
  }
} 
