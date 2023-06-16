import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { CreateMailComponent } from './create-mail/create-mail.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
 
  {path: 'signup', component:SignupComponent},
  {path: 'login', component:LoginComponent},
  {path: 'createmail', component:CreateMailComponent , canActivate: [AuthGuard]},
  {path:'',redirectTo: '/login',pathMatch:'full'},
  {path: '**', component:ErrorComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
