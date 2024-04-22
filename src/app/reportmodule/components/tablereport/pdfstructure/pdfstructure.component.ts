import { Component, OnInit } from '@angular/core';
import { BehaviorReportService } from '../../../service/behaviorReport.service';
import { ImgCarData } from '../../../interface/imgCarData.interface';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdfstructure',
  templateUrl: './pdfstructure.component.html',
  styleUrl: './pdfstructure.component.css'
})
export class PdfstructureComponent implements OnInit{

  constructor(private reportService: BehaviorReportService){}

  selectedReportService$ = this.reportService.selectedReport$;
  actualReport!: ImgCarData;
  timeElapsed = Date.now();
  today = new Date(this.timeElapsed);

  ngOnInit(): void {
    this.selectedReportService$.subscribe({
      next: (reportData) => {
        console.log(reportData);
        this.actualReport =  reportData;
      }
    })
  }

  generatePdf():void{
    const elementToPrint: HTMLElement = document.getElementById('table') as HTMLElement;

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);


    html2canvas(elementToPrint, {scale: 2}).then((canvas) => {


    const pdf = new jsPDF({
      orientation: 'p',
      format: 'a4'
    });


    pdf.setProperties({
      title: 'Reporte Imagenes',
      subject: 'PDF con el reporte de la orden e imagenes',
      author: 'Auto Vidrios Melien'
    });

    pdf.addImage(`assets\\bluePrintCar\\LogoMelien.png`, 'PNG', 70, 5, 75, 25);
    pdf.setFontSize(16);
    pdf.setFont('times', 'italic');
    pdf.text('Reporte detalles de imagenes de vehiculos', 56, 37);

    /** fecha */
    pdf.text(today.toLocaleDateString(), 95, 44);

    /** table with the principal data. */
    pdf.addImage(canvas.toDataURL('image/JPEG'), 'JPEG', 0, 50, 280, 25);

    /** Images */

    pdf.text('Imagen Lateral Derecho', 5, 80);
    pdf.addImage(this.actualReport.img_lateral_derecho, 5, 82, 95, 95);

    pdf.text('Imagen Lateral izquierdo', 110, 80);
    pdf.addImage(this.actualReport.img_lateral_izquierdo, 110, 82, 95, 95);

    pdf.text('Imagen Frontal', 5, 187);
    pdf.addImage(this.actualReport.img_frontal, 5 , 190, 95, 95);

    pdf.text('Imagen Trasera', 110, 187);
    pdf.addImage(this.actualReport.img_trasero, 110 , 190, 95, 95);

    /** Imagenes Anexadas. */

    pdf.addPage();
    pdf.text("Imagenes anexadas del Vehiculo.", 70, 10);

    pdf.addImage(this.actualReport.img_anexo1, 5, 15, 95, 95 );
    pdf.addImage(this.actualReport.img_anexo2, 110, 15, 95, 95);
    pdf.addImage(this.actualReport.img_anexo3, 5, 115, 95, 95);
    pdf.save('reporte Imagenes.pdf');
    });



  }
}
