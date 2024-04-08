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

    // const timeElapsed = Date.now();
    // const today = new Date(timeElapsed);

    // const columns = ["Compañia", "Sucursal", "Numero Orden"];
    // const row = [
    //   this.OrderSelected.compania,
    //   this.OrderSelected.sucursal,
    //   this.OrderSelected.orden_Numero
    // ];
    // const tableOptions = {
    //   startY: 65
    // }

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

  }

  ngOnInit(): void {
    this.getAllImages();
  }


}
