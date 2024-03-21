import { Component } from '@angular/core';
import { ApiCarsImgService } from '../../../snapshot/services/api-cars-img.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UpperCasePipe } from '@angular/common';

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


  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

LogIn():void {
  this.apiService.LoginUser(this.form)
  .subscribe({
    next:(response: any) => {
      console.log(response);
      localStorage.setItem('userName', response.userName);
      localStorage.setItem('password', response.password);
      localStorage.setItem('Token', response.token);
      this.authservice.currentUserSig.set(response.userName);
      this.router.navigateByUrl('/capturar');
    },
    error: (error: any) => {
      console.log(error);
    }
  })
}

}
