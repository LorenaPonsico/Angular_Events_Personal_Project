import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/auth-users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  userLoginOn: boolean = false;
  userData?: User[] = [];


  constructor(private accountservice: AccountService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.accountservice.currentUserLoginOn ? this.userLoginOn = true : this.userLoginOn = false;
    // this.userLoginOn = this.accountservice.currentUserLoginOn;??
    debugger
    this.userData = this.accountservice.currentUserLoginOn; // aqui me esta cogiendo los datos del anterior!! REVISAR
    console.log(this.userData)
  }

}
