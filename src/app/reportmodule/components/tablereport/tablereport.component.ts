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

  generatePdf(): void {

    // const doc = new jsPDF();

    // doc.addImage('../assets/bluePrintCar/LogoMelien.png',
    // 'PNG',
    // 60, //posicion en x
    // 10, //posicion en y
    // 100, //ancho
    // 30 // altura
    // );

    // doc.setFont('Times');
    // doc.setFontSize(18);
    // doc.text('Reporte de Ordenes.', 85, 50);

    // doc.setFontSize(12);
    // doc.text(`${today.toLocaleDateString()}`,105, 55);


    // doc.addImage(this.OrderSelected.img_lateral_derecho,
    //   'JPEG',
    //   35 ,
    //   70 ,
    //   150,
    //   150);

    // doc.save('PdfTest.pdf');
    this.modalRef?.hide()
    this.reportService.setReport(this.OrderSelected);
    this.router.navigateByUrl('/Preview');
  }

  ngOnInit(): void {
    this.getAllImages();
  }


}
