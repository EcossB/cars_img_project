import { Component, inject } from '@angular/core';
import { AuthService } from '../../../loginmodule/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { LoginResponse } from '../../../snapshot/interfaces/login.interface';
import { ApiCarsImgService } from '../../../snapshot/services/api-cars-img.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(public authservice: AuthService, 
    public fb: FormBuilder, 
    public apiService: ApiCarsImgService,
    public router: Router){}


  form = {
    userName: localStorage.getItem('userName'),
    password: localStorage.getItem('password')
  }

logOut() {
  this.apiService.LogOutUser(this.form).subscribe({
    next: (data:any) => {
      console.log(data);
    },
    error: (error) => {
      console.log(error);
    }
  })

  localStorage.setItem('Token', '');
  localStorage.setItem('userName', '');
  localStorage.setItem('password', '');
  this.authservice.currentUserSig.set(null);
  this.router.navigateByUrl('/');

}

}
