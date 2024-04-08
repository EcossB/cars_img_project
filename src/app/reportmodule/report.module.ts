import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainReportComponent } from './pages/main-report.component';
import { TablereportComponent } from './components/tablereport/tablereport.component';
import { FormsModule } from '@angular/forms';


import { AuthGuardService } from '../loginmodule/services/auth-guard.service';
import { AuthService } from '../loginmodule/services/auth.service';
import { ApiCarsImgService } from '../snapshot/services/api-cars-img.service';
import { NavbarModule } from '../navbar/navbar.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import * as jsPDF  from 'jspdf';
import html2canvas from 'html2canvas';
import { PdfstructureComponent } from './components/tablereport/pdfstructure/pdfstructure.component';
import { BehaviorReportService } from './service/behaviorReport.service';


@NgModule({
  declarations: [MainReportComponent, TablereportComponent, PdfstructureComponent],
  imports: [
    CommonModule,
    FormsModule,
    NavbarModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    
  ],
  exports: [MainReportComponent, TablereportComponent],
  providers:[ApiCarsImgService, AuthService, AuthGuardService, BehaviorReportService]
})
export class ReportModule { }
