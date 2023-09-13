import { Injectable } from '@angular/core';

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


  adult(control:any) { 
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 18); // Restar 18 años a la fecha actual

    if (selectedDate > currentDate) {
      return { edadMinima: true };
    }
    return null;
  }

}
