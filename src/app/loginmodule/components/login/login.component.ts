import { Component } from '@angular/core';
import { ApiCarsImgService } from '../../../snapshot/services/api-cars-img.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'module-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public apiService: ApiCarsImgService,
     public fb: FormBuilder,
      public router: Router,
      public authservice: AuthService){}

  Message: string = '';
  alertType: string = '';
  logIn: boolean = false;

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  throwAlert(message: string, alert: string){
    this.logIn = true;
    this.Message = message;
    this.alertType = alert;
  }
  setLocalStorage(username: string, password: string, token: string){
    localStorage.setItem('userName', username);
    localStorage.setItem('password', password);
    localStorage.setItem('Token', token);
  }


LogIn():void {
  this.apiService.LoginUser(this.form)
  .subscribe({
    next:(response: any) => {
      console.log(response);
      this.setLocalStorage(response.userName, response.password, response.token);
      this.authservice.currentUserSig.set(response.userName);
      this.throwAlert("Login succesfully", 'success');
      setTimeout(() => {this.router.navigateByUrl('/capturar');}, 2000);
    },
    error: (error: HttpErrorResponse ) => {
      this.throwAlert(error.error.token, 'danger');
      console.log(error);
    }
  })

  this.logIn = false;
}

}
