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


  numOrder: number = 0 ;


  getImagesbyNumOrder(num_Order: any){
    this.apiService.getImagesVehicleByNumOrder(num_Order)
    .subscribe({
      next: (data: any) => {
        console.log(data);
        console.log(parseInt(num_Order));
        this.imgCarDataList = data;
        console.log(this.imgCarDataList);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        console.log(parseInt(num_Order));
      }
    })
  }

}
