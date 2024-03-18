import { Component } from '@angular/core';
import { imagePreview } from '../interfaces/previewImage.interface';
import { Vehicle } from '../interfaces/vehicle.interface';
import { ApiCarsImgService } from '../services/api-cars-img.service';
import { SaveVehiclePayload } from '../interfaces/DataImgPayload.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'main-page-snapshot',
  templateUrl: 'main.component.html',
  styleUrl: 'main.component.css'
})

export class SnapshotComponent  {

  title='SnapShotComponent';

  constructor(public apiService: ApiCarsImgService){}

  /** Objeto que va almacenar los valores del preview de las imagenes. */

  imagePrevieCars: imagePreview = {
    carleftPreview: '',
    carRightPreview: '',
    carFrontPreview: '',
    carBackPreview: ''
  }

  saveimagePayload: SaveVehiclePayload = {
    compania: '',
    sucursal: '',
    orden_Numero: 0,
    img_lateral_derecho: '',
    img_lateral_izquierdo: '',
    img_frontal: '',
    img_trasero: ''
  }

  vehicleObtained: Vehicle = {
    compania: '',
    sucursal: '',
    orden_Numero: 0,
    chasis: '',
    marca: 0,
    modelo: 0,
    ano: 0,
    placa: '',
    color: 0
  }


  onNewPhoto(photo: imagePreview): void {
    console.log(photo);
    /*these properties are for the preview image */
    this.imagePrevieCars.carRightPreview = photo.carRightPreview;
    this.imagePrevieCars.carleftPreview = photo.carleftPreview;
    this.imagePrevieCars.carFrontPreview = photo.carFrontPreview;
    this.imagePrevieCars.carBackPreview = photo.carBackPreview;

    /*these properties are for the payload to the api */
    this.saveimagePayload.img_lateral_derecho = photo.carRightPreview;
    this.saveimagePayload.img_lateral_izquierdo = photo.carleftPreview;
    this.saveimagePayload.img_frontal = photo.carFrontPreview;
    this.saveimagePayload.img_trasero = photo.carBackPreview;
  }


  onNewDataTable(vehicle: Vehicle):void {
    this.vehicleObtained = vehicle;

    /*these properties are for the payload to the api */
    this.saveimagePayload.compania = vehicle.compania;
    this.saveimagePayload.sucursal = vehicle.sucursal;
    this.saveimagePayload.orden_Numero = vehicle.orden_Numero;
  }


saveImages():void{
 
  this.apiService.SaveImagesVehicle(this.saveimagePayload).
  subscribe({
    next:(data: any) => {
      alert(data.mensaje);
      this.reloadPage();
    },
    error:(error: HttpErrorResponse) => {
      if(error.status == 400){
        alert("Debes de buscar el vehiculo y tambien tomar las 4 fotografias.")
      }
      console.log(error)
    }
  })
}

reloadPage():void {
  window.location.reload();
  }


}
