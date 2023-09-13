import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog'; // material de angular DIALOG/MODAL

//libreria angular
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NavbarScrollDirective } from './navbar-scroll.directive';
// import { JwtInterceptor, ErrorInterceptor } from './helpers';

// Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { EventsListComponent } from './components/public/events-list/events-list.component';
import { EventCreateComponent } from './components/user/event-create/event-create.component';
import { EventDetailsComponent } from './components/user/event-details/event-details.component';
import { EventsScheduleComponent } from './components/user/events-schedule/events-schedule.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { CommunityComponent } from './components/public/community/community.component';
import { DialogCustomComponent } from './components/dialog-custom/dialog-custom.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    EventsListComponent,
    EventCreateComponent,
    EventDetailsComponent,
    EventsScheduleComponent,
    LayoutComponent,
    DashboardComponent,
    CommunityComponent,
    NavbarScrollDirective,
    DialogCustomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }), // ToastrModule added 
    CarouselModule.forRoot(),
    FormsModule,
    MatDialogModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent, 
  ]
})
export class AppModule { }
