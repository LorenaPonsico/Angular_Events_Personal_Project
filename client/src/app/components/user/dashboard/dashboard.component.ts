import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/auth-users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userLoginOn: boolean = false;
  userData?: User;


  constructor( private accountservice: AccountService){}

  ngOnInit(): void {
   this.accountservice.currentUserLoginOn ? this.userLoginOn= true: this.userLoginOn = false;
   debugger
   this.userData =  this.accountservice.currentUserLoginOn;
   console.log(this.userData)

   
  }

}
