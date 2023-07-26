import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, RegisterComponent } from './components/auth';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'inicio', component: LayoutComponent},
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'panel-control', component: DashboardComponent },


  // otherwise redirect to home
  { path: '**', redirectTo: '/inicio', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

