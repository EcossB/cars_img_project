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
    const elementToPrint: HTMLElement = document.getElementById('pdfContent2') as HTMLElement;
    
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    html2canvas(elementToPrint, {scale: 1}).then((canvas) => {
      const pdf = new jsPDF({
        orientation: 'p',
        format: 'a0'
      });

      
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 110,5,600,1200);

      pdf.setProperties({
        title: 'Reporte Imagenes',
        subject: 'PDF con el reporte de la orden e imagenes',
        author: 'Auto Vidrios Melien'
      });

      pdf.setFontSize(14);

      pdf.save('reporte Imagenes.pdf');

    });
  }
}
