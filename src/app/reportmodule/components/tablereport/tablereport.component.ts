import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiCarsImgService } from '../../../snapshot/services/api-cars-img.service';
import { ImgCarData } from '../../interface/imgCarData.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import  {jsPDF}  from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'report-tablereport',
  templateUrl: './tablereport.component.html',
  styleUrl: './tablereport.component.css'
})
export class TablereportComponent implements OnInit{

  constructor(
    public apiService: ApiCarsImgService,
    private modalService: BsModalService){}

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
    const elementToPrint: HTMLElement = document.getElementById('pdfContent') as HTMLElement;

    html2canvas(elementToPrint, {scale: 2}).then((canvas) => {
      const pdf = new jsPDF();

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0,0,211,298);

      pdf.setProperties({
        title: 'Reporte Imagenes',
        subject: 'PDF con el reporte de la orden e imagenes',
        author: 'Auto Vidrios Melien'
      });

      pdf.setFontSize(14);

      pdf.save('reporte Imagenes.pdf');
      
    });

  }

  ngOnInit(): void {
    this.getAllImages();
  }


}
