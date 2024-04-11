import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImgVehicle } from '../interfaces/Imgvehicle.interface';
import { chasis } from '../interfaces/chasis.interface';
import { FormGroup } from '@angular/forms';
import { LoginResponse } from '../interfaces/login.interface';
import { message } from '../../loginmodule/interface/message.interface';
import { ImgCarData } from '../../reportmodule/interface/imgCarData.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiCarsImgService {

  constructor(public http: HttpClient) { }

  private urlApiCarsImg: string = 'https://localhost:7016/api';
  //private urlApiCarsImg: string = 'http://172.24.3.124:3200/api';
  //private urlApiCarsImg: string = 'http://192.168.100.141:3200/api';
  //private urlApiCarsImg: string = '/api';

  /*---- these methods are for retrieve the data of the Endpoint {vehicle} in the Api. ----- */
  /*----- the data that is coming, its for the component car-data. -----*/


  header_object = new HttpHeaders().set("Authorization", "bearer " + localStorage.getItem('Token'));

  httpOptions = {
    headers: this.header_object
  };

  token: string | null = localStorage.getItem('Token');


  getAllVehiclesData(tokenUser: string | null): Observable<Object> {
    return this.http.get(`${this.urlApiCarsImg}/Vehicle?user=${tokenUser}`, this.httpOptions);
  }

  getVehicleByChasis(chasis: string): Observable<Object>{
    return this.http.get(`${this.urlApiCarsImg}/Vehicle/${chasis}?user=${this.token}`, this.httpOptions);
  }

  getAllChasis(): Observable<chasis[]> {
    return this.http.get<chasis[]>(`${this.urlApiCarsImg}/Vehicle/allChasis?user=${this.token}`, this.httpOptions);
  }

  getChasis(chasis: string, tokenUser: string | null): Observable<chasis[]>{
    return this.http.get<chasis[]>(`${this.urlApiCarsImg}/Vehicle/single/${chasis}?user=${tokenUser}`, this.httpOptions);
  }

  /*------------------------------------------------------------------- */

  /*Methods for endpoint ImgVehicle, these methods save and retrieve data for the image vehicles. */

  getAllImagesVehicle(): Observable<Object> {
    return this.http.get(`${this.urlApiCarsImg}/ImgVehicle?user=${this.token}`, this.httpOptions);
  }

  getImagesVehicleByNumOrder(num_order: number): Observable<Object> {
    return this.http.get<ImgCarData[]>(`${this.urlApiCarsImg}/ImgVehicle/${num_order}?user=${this.token}`, this.httpOptions);
  }

  SaveImagesVehicle(payload: ImgVehicle, tokenUser: string | null) {
    return this.http.post(`${this.urlApiCarsImg}/ImgVehicle?user=${tokenUser}`, payload, this.httpOptions);
  }

  /* ------------------------------------------------------------------ */
  /*The next methods are for login and logout endpoints. */

  LoginUser(form: FormGroup){
    return this.http.post<{user: LoginResponse}>(`${this.urlApiCarsImg}/Auth`, form.getRawValue());
  }

  LogOutUser(form: any){
    return this.http.post<{mesage: message}>(`${this.urlApiCarsImg}/Auth/logout`, form);
  }

}
