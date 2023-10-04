import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { AccountService } from '../../../services/auth-users.service';
import { User } from 'src/app/models/user';
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
    private dialog: MatDialog ) {}


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
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    console.log(this.isNavbarCollapsed)
  }
  
  openDialogCustom(template: TemplateRef<any>) {
    this.dialogService.openDialogCustom({
      template
    })
  }
  
  closeNavbar(): void {
    this.isNavbarCollapsed = true;
    console.log(this.isNavbarCollapsed)
  }
  
  logout() {
    this.accountService.logout();
    this.toastr.info('Sesion cerrada', 'Has cerrado sesion correctamente');
  }
  
}

