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

  /*
  TODO: Inyeccion de servicios y dependencias a traves de composicion.
  * public apiService: ApiCarsImgService, // Para interactuar con la API.
  * public fb: FormBuilder, // para poder hacer un formulario el cual se mandaria a la api para el log out
  * public router: Router, // para redireccionar al componente login cuando se haga log out.
  * public authservice: AuthService // para setear el signal y notificar a toda la app.
   */
  constructor(public authservice: AuthService,
    public fb: FormBuilder,
    public apiService: ApiCarsImgService,
    public router: Router){}


/*
 * Este form es utilizado para obtener del localstorage el nombre y password del usuario
 * de esta manera los mandamos en el end point del logout para sacar el usuario del pool de conexion.
 */
  form = {
    userName: localStorage.getItem('userName')
  }

/*
  * este metodo lo que hace es hacer la peticion de la api para el deslogueo del usuario
  * le mandamos el form para que lo busque en el pool de conexiones y lo saque.
  *
  * Por ultimo seteamos el nombre de usuario, password y token como vacios y redirigimos a
  * la pagina del login.
*/
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
  this.authservice.currentUserSig.set(null);
  this.router.navigateByUrl('/');

  }

}
