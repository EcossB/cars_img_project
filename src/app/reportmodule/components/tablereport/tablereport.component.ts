import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiCarsImgService } from '../../../snapshot/services/api-cars-img.service';
import { ImgCarData } from '../../interface/imgCarData.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ITable, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';

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

  generatePdf(){
    const pdf = new PdfMakeWrapper();

    let dateNow = new Date().toDateString();


    pdf.add(this.createText('Reporte detalles de imagenes de vehiculos').alignment('center').bold().end);
    pdf.add('\n');
    pdf.add(this.createText(dateNow).alignment('center').end);
    pdf.add('\n \n');
    pdf.add(this.createTable());
    pdf.add('\n \n');
    pdf.add(this.createText('Imagenes Lateral Derecho').bold().end);
    pdf.add('\n');
    
    pdf.add(this.createImgLateral(this.OrderSelected.img_lateral_derecho, pdf));

    //pdf.images({picture1: `${this.OrderSelected.img_lateral_derecho}`})

    pdf.create().open();
  }

  createTable(): ITable {
    
    return new Table([
      ['Compania', 'Sucursal', 'Numero de Orden'],
      [this.OrderSelected.compania, this.OrderSelected.sucursal, this.OrderSelected.orden_Numero]
    ])
    .layout('lightHorizontalLines')
    .width('auto')
    .alignment('center')
    .end;
  }

   createImgLateral(stringImg : string, pdf: PdfMakeWrapper) {
      pdf.images({
        picture: (`${stringImg}`)
      });

      console.log(stringImg);
  }

  createText(text: string) {
    return new Txt(text);
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

  ngOnInit(): void {
    this.getAllImages();
  }


}
