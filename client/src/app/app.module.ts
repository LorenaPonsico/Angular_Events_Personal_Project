import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { CalendarComponent } from './components/user/calendar/calendar.component';
import { EventsScheduleComponent } from './components/user/events-schedule/events-schedule.component';
import { SearchComponent } from './components/user/search/search.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';


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
    CalendarComponent,
    EventsScheduleComponent,
    SearchComponent,
    LayoutComponent,
    DashboardComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent, 
  ]
})
export class AppModule { }
