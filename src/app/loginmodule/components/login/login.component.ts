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

  /*
  TODO: Inyeccion de servicios y dependencias a traves de composicion.
  * public apiService: ApiCarsImgService, // Para interactuar con la API.
  * public fb: FormBuilder, // para poder hacer un formulario para el login
  * public router: Router, // para redireccionar cuando se haga el login.
  * public authservice: AuthService // para setear el signal y notificar a toda la app.
   */
  constructor(
      public apiService: ApiCarsImgService,
      public fb: FormBuilder,
      public router: Router,
      public authservice: AuthService
      ){}


  /**
  ** Message: propiedad para el mensaje de succesfuly o credenciales invalidas
  ** alertType:  propiedad para pasar la clase de bootstrap dependiendo del mensaje.
  ** logIn:  propiedad que cuando esta true indica que se logueo exitosamente.
   */
  Message: string = '';
  alertType: string = '';
  logIn: boolean = false;

  /**
   * * este form lo que hace es validar que los campos username y password no esten vacios
   * * de esta manera controlamos desde el front que no se manden campos nulos para el login.
   * * este form lo usamos en el html a traves de [formGroup]
   */
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

/*
* Este metodo recibe dos metodos: message para los mensajes que devuelven los endpoint de la api
* alert para indicar la clase de bootstrap que llevara el mensaje.
*
* este metodo es utilizado en la subscripcion de la llamada de la api
* dentro del metodo modificamos el mensaje por el mensaje que devolvio la api
* y el tipo de alerta dependiendo si el response vino por el next o por el error.
*/
  throwAlert(message: string, alert: string){
    this.logIn = true;
    this.Message = message;
    this.alertType = alert;
  }

/**
 *
 * @param username
 * @param password
 * @param token
 *
 * *Este metodo es utilizado cuando la peticion a la api es exitosa
 * *lo que hace este metodo es setear en el local storage lo que devuelve la api a la hora de
 * *hacer una autenticacion exitosa (el nombre del usuario, su contrasena y el token.)
 *
 * *de esta manera el usuario puede acceder a las diferentes rutas gracias al signal de Authservice
 * *y al guarService que tiene el metodo canActivate.
 */
  setLocalStorage(username: string,  token: string){
    localStorage.setItem('userName', username);
    localStorage.setItem('Token', token);
  }


  /**
   * !Este metodo es el que utiliza el apiService para hacer peticion en la url de autenticacion
   * !de la api.
   *
   * !Cuando la suscripcion es exitosa:
   **- Utilizamos el metodo setLocalStorage para setear el token en el local storage y asi el usuario
   ** pueda acceder al componente principal y hacer las diferentes peticiones a la api.
   *
   **- Seteamos el signal con el nombre del usuario, asi toda la aplicacion sabe que usuario
   ** esta logeado en la aplicacion.
   *
   **- Despues utilizamos el metodo throwAlert para primero lanzar la alerta, segundo el mensaje
   ** de login succesfully y por ultimo el tipo de alerta de bootstrap.
   *
   **- Y por ultimo seteamos un timer para que navegue a la ruta /capturar en dos segundo.
   *
   * !Cuando la suscripcion da error:
   *
   **- usamos el metodo throw alert y le pasamos el mensaje que devuelve la api al dar error y
   ** el tipo de clase danger de bootstrap.
   *
   * *una vez termina de llamarse el metodo se setea la propiedad login a false por default.
   */
  LogIn():void {
    this.apiService.LoginUser(this.form)
    .subscribe({
      next:(response: any) => {
        this.setLocalStorage(response.userName, response.token);
        this.authservice.currentUserSig.set(response.userName);
        this.throwAlert("Login succesfully", 'success');
        setTimeout(() => {this.router.navigateByUrl('/capturar');}, 2000);
      },
      error: (error: HttpErrorResponse) => {
        this.throwAlert(error.error.token, 'danger');
      }
    })

    this.logIn = false;
  }

}
