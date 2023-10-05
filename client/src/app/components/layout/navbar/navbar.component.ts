import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { AccountService } from '../../../services/auth-users.service';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  userLoginOn: boolean = false;
  user: any;
  isNavbarCollapsed = true;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private elRef: ElementRef
  ) { }


  ngOnInit(): void {
    this.isNavbarCollapsed = true;
    this.accountService.user.subscribe((user) => {
      this.user = user;
      this.userLoginOn = !!user; // Convertimos el objeto user en un valor booleano

      console.log('Usuario autenticado:', this.userLoginOn);
      if (this.userLoginOn && this.user) {
        console.log('Nombre de usuario:', this.user.user.name);
      } else {
        console.log('Usuario no autenticado o nombre de usuario no disponible');
      }
    });
    console.log(this.isNavbarCollapsed)
  }

  toggleNavbar() {
    this.isNavbarCollapsed = true;
    console.log(this.isNavbarCollapsed);
  }

  openDialogCustom(template: TemplateRef<any>) {
    this.dialogService.openDialogCustom({
      template
    })
  }

  closeNavbar(): void {
    if (this.isNavbarCollapsed) {
      this.isNavbarCollapsed = true;
      const menuToggle = this.elRef.nativeElement.querySelector('#menuToggle'); // Obtén el elemento del botón de hamburguesa usando ElementRef
      if (menuToggle) {
        menuToggle.click(); // Simula un clic en el botón de hamburguesa para cerrar el menú
      }
    }
  }

  logout() {
    this.accountService.logout();
    this.toastr.info('Sesion cerrada', 'Has cerrado sesion correctamente');
  }
}

