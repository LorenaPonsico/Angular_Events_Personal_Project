import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent, RegisterComponent } from './components/auth';
import { LayoutComponent } from './components/layout/layout.component';
// import { AuthGuard } from './helpers';

const routes: Routes = [
  { path: 'inicio', component: LayoutComponent},
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '/inicio', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

