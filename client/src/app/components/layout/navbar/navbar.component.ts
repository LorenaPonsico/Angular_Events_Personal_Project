import { Component, HostListener, OnInit } from '@angular/core';
import { AccountService } from '../../../services/auth-users.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userLoginOn: boolean = false;
  user?: User | null;
  // navbarScrolled = false;


  constructor(private accountService: AccountService, private toastr: ToastrService) {}

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   // Cambia el valor 100 a la posición de scroll en la que deseas que el navbar tenga el fondo de color
  //   this.navbarScrolled = document.documentElement.scrollTop > 100;
  // }

  ngOnInit(): void {
    this.accountService.user.subscribe((user) => {
      this.user = user;
      this.userLoginOn = !!user; // Convertimos el objeto user en un valor booleano
    });
  }
  closeNavbar(): void {
    const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement | null;
    if (navbarToggler) {
      navbarToggler.click();
    }
  }

  logout() {
    this.accountService.logout();
    // this.toastr.info('Sesion cerrada', 'Has cerrado sesion correctamente');
  }
  
}

