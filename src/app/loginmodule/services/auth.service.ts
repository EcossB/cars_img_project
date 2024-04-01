import { Injectable, signal } from '@angular/core';
import { LoginResponse } from '../../snapshot/interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /*
  * Este signal lo que hace es indicarle a toda la app que el usuario esta logueado o no.
   */
  currentUserSig = signal<LoginResponse | undefined | null>(undefined);
}
