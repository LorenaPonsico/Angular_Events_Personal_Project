import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/auth-users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userLoginOn: boolean = false;
  
  constructor( private accountService:AccountService ){}

  ngOnInit(): void {

    this.accountService?.currentUserLoginOn?.subscribe(
      {
      next: (userLoginOn: boolean) => {
        this.userLoginOn = userLoginOn;
      }
    })
    
  }
  
}
