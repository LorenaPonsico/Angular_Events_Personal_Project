import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Asegúrate de importar esto
import { Event } from 'src/app/models/event';
import { DialogService } from 'src/app/services/dialog.service';
import { EventsService } from 'src/app/services/events.service';

// interface HtmlInputEvent extends Event{
//   target: HTMLInputElement & EventTarget;
// }

interface InputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent {
  eventForm: FormGroup;
  file: File | undefined;
  photoSelected: string | ArrayBuffer | undefined

  constructor(
    private fb: FormBuilder,
    private router: Router, // Asegúrate de tener esto
    private toastr: ToastrService, // Asegúrate de tener esto
    private eventService: EventsService,
    private dialogService: DialogService
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

  // onPhotoSelected(input: HTMLInputElement): void {
  //   if (input.files && input.files[0]) {
  //     this.file = input.files[0];
  //     // Vista previa de imágenes
  //     const reader = new FileReader();
  //     reader.onload = e => this.photoSelected = reader.result as string;
  
  //     reader.readAsDataURL(this.file);
  //   }
  // }
  
  
  openDialogCustom(template: TemplateRef<any>) {
    this.dialogService.openDialogCustom({
      template
    }).afterClosed().subscribe(res => console.log('Dialog close', res))
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

      this.saveEvent(EVENT);
    
  }

  public saveEvent(event: Event) {
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
