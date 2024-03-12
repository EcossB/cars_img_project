import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './components/login/login.component';
import { MainLoginComponent } from './pages/main.component';

@NgModule({
  declarations: [
    MainLoginComponent,
    LoginComponent
  ],
  exports:[
    MainLoginComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
