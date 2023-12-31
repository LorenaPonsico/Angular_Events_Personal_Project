import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';

//componentes
import { LoginComponent, RegisterComponent } from './components/auth';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { EventCreateComponent } from './components/user/event-create/event-create.component';
import { EventsScheduleComponent } from './components/user/events-schedule/events-schedule.component';
import { CommunityComponent } from './components/public/community/community.component';
import { EventDetailsComponent } from './components/user/event-details/event-details.component';

const routes: Routes = [
  { path: 'inicio', component: LayoutComponent },
  { path: 'comunidad', component: CommunityComponent },
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'panel-control', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'crear-evento', component: EventCreateComponent, canActivate: [AuthGuard] },
  { path: 'editar-evento/:id', component: EventCreateComponent, canActivate: [AuthGuard] },
  { path: 'ver-eventos', component: EventsScheduleComponent, canActivate: [AuthGuard] },
  { path: 'event/:eventId', component: EventDetailsComponent },
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' } // si el usuario pone en la barra un nombre que no existe, angular redirige a la ruta raiz
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top', // Esto restaurará la posición de desplazamiento a la parte superior
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

