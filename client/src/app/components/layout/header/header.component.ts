import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  images = [
    { id: 1, url: '../../../../assets/evento.jpg' },
    { id: 2, url: '../../../../assets/comunidad.jpg' },
    { id: 3, url: '../../../../assets/hands.jpg' },
    // Agrega más objetos de imagen según sea necesario
  ];
}
