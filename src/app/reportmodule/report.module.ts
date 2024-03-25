import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainReportComponent } from './pages/main-report.component';
import { TablereportComponent } from './components/tablereport/tablereport.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MainReportComponent, TablereportComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [MainReportComponent, TablereportComponent]
})
export class ReportModule { }
