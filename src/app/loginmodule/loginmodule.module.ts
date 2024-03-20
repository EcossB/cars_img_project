import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './components/login/login.component';
import { MainLoginComponent } from './pages/main.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule
  ]
})
export class LoginModule { }
