import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Asegúrate de importar esto
import { Event } from 'src/app/models/event';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent {
  eventForm: FormGroup;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router, // Asegúrate de tener esto
    private toastr: ToastrService, // Asegúrate de tener esto
    private eventService: EventsService
  ) {
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

  handleImageUpload(event: any) {
    this.selectedImage = event.target.files[0];
  }

  createEvent() {
    if (this.eventForm.invalid) {
      return;
    }

    const EVENT: Event = {
      title: this.eventForm.get('title')?.value,
      date: this.eventForm.get('date')?.value,
      startTime: this.eventForm.get('startTime')?.value,
      endTime: this.eventForm.get('endTime')?.value,
      capacity: this.eventForm.get('capacity')?.value,
      type: this.eventForm.get('type')?.value,
      location: this.eventForm.get('location')?.value,
      description: this.eventForm.get('description')?.value,
    };

    if (this.selectedImage) {
      this.eventService.uploadImage(this.selectedImage).subscribe(
        response => {
          EVENT.imageURL = response.url; // Asigna la URL de la imagen subida
          this.saveEvent(EVENT);
        },
        error => {
          console.error(error);
          this.toastr.error('Error al subir la imagen'); // Utiliza Toastr para mostrar el mensaje de error
        }
      );
    } else {
      this.saveEvent(EVENT);
    }
  }

  private saveEvent(event: Event) {
    this.eventService.createEvent(event).subscribe(
      () => {
        this.toastr.success('El evento fue creado con éxito', 'Evento subido!'); // Utiliza Toastr para mostrar mensaje de éxito
        this.router.navigate(['/ver-eventos']); // Utiliza Router para navegar después de crear el evento
      },
      error => {
        console.error(error);
        this.toastr.error('Error al crear el evento'); // Utiliza Toastr para mostrar mensaje de error
      }
    );
  }
}
