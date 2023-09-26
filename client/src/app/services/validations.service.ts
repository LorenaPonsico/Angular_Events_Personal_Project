import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  nonNegativeNumberValidator(control: any) {
    const value = control.value;
    if (value !== null && value <= 0) {
      return { nonNegativeNumber: true };
    }
    return null;
  }

  adult(control: any) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 18); // Restar 18 años a la fecha actual

    if (selectedDate > currentDate) {
      return { edadMinima: true };
    }
    return null;
  }

  validateDateNotPast(control: any): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    
    if (selectedDate < today) {
      return { dateInPast: true }; // Devuelve un error si la fecha es anterior a hoy
    }
    
    return null; // La fecha es válida
  }

}
