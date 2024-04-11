import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiCarsImgService } from '../../../snapshot/services/api-cars-img.service';
import { ImgCarData } from '../../interface/imgCarData.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import  {jsPDF}  from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { BehaviorReportService } from '../../service/behaviorReport.service';

@Component({
  selector: 'report-tablereport',
  templateUrl: './tablereport.component.html',
  styleUrl: './tablereport.component.css'
})
export class TablereportComponent implements OnInit{

  constructor(
    public apiService: ApiCarsImgService,
    private modalService: BsModalService,
    public router: Router,
    private reportService: BehaviorReportService){}

  imgCarDataList: ImgCarData[] = [];

  OrderSelected!: ImgCarData;
  page: number = 1 // page for the pagination end
  numOrder: number = 0 ;

  modalRef?: BsModalRef;

  openModal(template: TemplateRef<void>, order: ImgCarData): void{
    this.modalRef = this.modalService.show(template);
    this.OrderSelected = order;
  }


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

  get4Images(): void {
    this.apiService.get5ImagesVehicle().subscribe({
      next: (data: any) => {
        this.imgCarDataList = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

  onScroll():void {

    let token = window.localStorage.getItem('Token');
    

    console.log(token)
    this.page += 1;

    this.apiService.getImagesVehiclePagination(token, this.page, 4 ).subscribe({
      next: (data: any) => {
        /** TODO: poner un if el cual valide que la data que venga no este vacia */
        console.log(data);
        this.imgCarDataList = this.imgCarDataList.concat(data);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  generatePdf(): void {
    this.modalRef?.hide()
    this.reportService.setReport(this.OrderSelected);
    this.router.navigateByUrl('/Preview');
  }

  ngOnInit(): void {
    this.get4Images();
  }


}
