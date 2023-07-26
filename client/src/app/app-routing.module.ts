import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { LoginComponent, RegisterComponent } from './components/auth';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { EventCreateComponent } from './components/user/event-create/event-create.component';
import { EventsScheduleComponent } from './components/user/events-schedule/events-schedule.component';
// import { AuthGuard } from './helpers';

const routes: Routes = [
  { path: 'inicio', component: LayoutComponent },
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'panel-control', component: DashboardComponent },
  { path: 'crear-evento', component: EventCreateComponent },
  { path: 'editar-evento/:id', component: EventCreateComponent },
  { path: 'ver-eventos', component: EventsScheduleComponent },
  { path: '**', redirectTo: '/inicio', pathMatch:'full' } // si el usuario pone en la barra un nombre que no existe, angular redirige a la ruta raiz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

