import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {AboutComponent} from './about/about.component';

import {AuthGuard} from './auth.guard';

const routes: Routes = [
  // {path: 'home' , component: HomeComponent},
  {path: 'signup' , component: SignupComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'about' , component: AboutComponent},
  {path: '' , redirectTo: '/about', pathMatch: 'full'},
  {path: 'home' , component: HomeComponent, canActivate: [AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
