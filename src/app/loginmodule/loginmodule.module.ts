import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap/alert'

import { LoginComponent } from './components/login/login.component';
import { MainLoginComponent } from './pages/main.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';


@NgModule({
  declarations: [
    MainLoginComponent,
    LoginComponent
  ],
  exports:[
    MainLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertModule.forRoot()
    
  ],
  providers:[AuthService, AuthGuardService]

})
export class LoginModule { }
