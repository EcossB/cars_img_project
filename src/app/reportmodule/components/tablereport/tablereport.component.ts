import { Component, OnInit } from '@angular/core';
import { ApiCarsImgService } from '../../../snapshot/services/api-cars-img.service';
import { ImgCarData } from '../../interface/imgCarData.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'report-tablereport',
  templateUrl: './tablereport.component.html',
  styleUrl: './tablereport.component.css'
})
export class TablereportComponent implements OnInit{

  constructor(public apiService: ApiCarsImgService){}

  imgCarDataList: ImgCarData[] = [];


  numOrder: number = 0 ;


  getImagesbyNumOrder(num_Order: any){
    this.apiService.getImagesVehicleByNumOrder(num_Order)
    .subscribe({
      next: (data: any) => {
        this.imgCarDataList = [];
        this.imgCarDataList.push(data);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        console.log(parseInt(num_Order));
      }
    })
  }

  getAllImages(): void {
    this.apiService.getAllImagesVehicle().subscribe({
      next: (data: any) => {
        this.imgCarDataList = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

  ngOnInit(): void {
    this.getAllImages();
  }


}
