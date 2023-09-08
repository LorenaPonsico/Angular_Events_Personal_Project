import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// import { JwtInterceptor, ErrorInterceptor } from './helpers';

// Componentes
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
import { CommunityComponent } from './components/public/community/community.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
// import { ModalsComponent } from './components/modals/modals.component';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { NavbarScrollDirective } from './navbar-scroll.directive';

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
    DashboardComponent,
    CommunityComponent,
    ConfirmationModalComponent,
    NavbarScrollDirective


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    CarouselModule.forRoot(),
    FormsModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent, 
  ]
})
export class AppModule { }
