import { Component } from '@angular/core';
import { ApiCarsImgService } from '../../../snapshot/services/api-cars-img.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'module-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(public apiService: ApiCarsImgService, public fb: FormBuilder, public router: Router){}


  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

LogIn():void {
  this.apiService.LoginUser(this.form)
  .subscribe((response: any) =>{
    console.log("Response", response)
    localStorage.setItem('token', response.token);
  });
}

}
