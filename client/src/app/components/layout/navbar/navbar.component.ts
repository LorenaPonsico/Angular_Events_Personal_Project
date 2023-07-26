import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/auth-users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userLoginOn: boolean = false;
  user?: User | null;
  
  constructor( private accountService:AccountService ){
    this.accountService.user.subscribe(x => this.user = x);
  }
  
  logout() {
    this.accountService.logout();
}

  ngOnInit(): void {

    this.accountService?.currentUserLoginOn?.subscribe(
      {
      next: (userLoginOn: boolean) => {
        this.userLoginOn = userLoginOn;
      }
    })
    
  }
  
}
