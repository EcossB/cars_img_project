import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImgVehicle } from '../interfaces/Imgvehicle.interface';
import { chasis } from '../interfaces/chasis.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiCarsImgService {

  constructor(public http: HttpClient) { }

  private urlApiCarsImg: string = 'https://localhost:7016/';

  /*---- these methods are for retrieve the data of the Endpoint {vehicle} in the Api. ----- */
  /*----- the data that is coming, its for the component car-data. -----*/
  


  getAllVehiclesData(): Observable<Object> {
    return this.http.get(`${this.urlApiCarsImg}api/Vehicle`);
  }

  getVehicleByChasis(chasis: string): Observable<Object>{
    return this.http.get(`${this.urlApiCarsImg}api/Vehicle/${chasis}`);
  }

  getAllChasis(): Observable<chasis[]> {
    return this.http.get<chasis[]>(`${this.urlApiCarsImg}api/Vehicle/allChasis`);
  }

  getChasis(chasis: string): Observable<chasis[]>{
    return this.http.get<chasis[]>(`${this.urlApiCarsImg}api/Vehicle/single/${chasis}`);
  }

  /*------------------------------------------------------------------- */

  /*Methods for endpoint ImgVehicle, these methods save and retrieve data for the image vehicles. */

  getAllImagesVehicle(): Observable<Object> {
    return this.http.get(`${this.urlApiCarsImg}api/ImgVehicle`);
  }

  getImagesVehicleByNumOrder(num_order: number): Observable<Object> {
    return this.http.get(`${this.urlApiCarsImg}api/ImgVehicle/${num_order}`);
  }

  SaveImagesVehicle(payload: ImgVehicle) {
    return this.http.post(`${this.urlApiCarsImg}api/ImgVehicle`, payload);
  }

  /* ------------------------------------------------------------------ */


}
