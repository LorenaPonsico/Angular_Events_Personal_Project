import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent, RegisterComponent } from './components/auth';
// import { AuthGuard } from './helpers';

const routes: Routes = [
  // { path: '', component: AppComponent, canActivate: [AuthGuard] },

  { path: 'auth/login', component: LoginComponent },
  { path: 'register/register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
