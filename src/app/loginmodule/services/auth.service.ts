import { Injectable, signal } from '@angular/core';
import { LoginResponse } from '../../snapshot/interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  currentUserSig = signal<LoginResponse | undefined | null>(undefined);
}
