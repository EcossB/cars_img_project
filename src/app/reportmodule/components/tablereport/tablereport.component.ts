import { Component } from '@angular/core';
import { ApiCarsImgService } from '../../../snapshot/services/api-cars-img.service';
import { ImgCarData } from '../../interface/imgCarData.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'report-tablereport',
  templateUrl: './tablereport.component.html',
  styleUrl: './tablereport.component.css'
})
export class TablereportComponent {

  constructor(public apiService: ApiCarsImgService){}

  imgCarDataList: ImgCarData[] = [];

  numOrder: number = 0;


  getImagesbyNumOrder(num_Order: number){
    this.apiService.getImagesVehicleByNumOrder(num_Order)
    .subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

}
