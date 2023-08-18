import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/auth-users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // userLoginOn: boolean = true;
  userData: any | null;
  userDetails: User| null = null; // Declarar una variable para almacenar userDetails


  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    // this.userLoginOn = this.accountService.currentUserLoginOn;
    this.userData = this.accountService.userValue;
    // Si userData tiene una propiedad user, puedes acceder a los atributos de user
    if (this.userData && this.userData.user) {
      this.userDetails = this.userData.user;
      // console.log(this.userDetails)
    }
  }

  // getEvents(){

  // }
}