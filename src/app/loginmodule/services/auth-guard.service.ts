import { Injectable, inject } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }

 /**
 * 
 * ! Como funciona el metodo can activate?
 * * retorna un booleano dependiendo de si el
 * * local storage del navegador contiene el token de inicio de sesion del usuario.
 * * Si retorna un true lo dejara entrar, si no tiene un token, pues no lo dejara pasar.
 * 
 * *Este servicio se inyecta en el app-routing para la propiedad canActivate de los path.
*/


  canActivate(): boolean 
  | UrlTree 
  | Observable<boolean 
  | UrlTree> 
  | Promise<boolean 
  | UrlTree> {

    if(localStorage.getItem('Token')){
        return true;
    } else {
        alert("Debes de iniciar Sesion primero.");
        return false;
    }
}

}

