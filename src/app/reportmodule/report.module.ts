import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainReportComponent } from './pages/main-report.component';
import { TablereportComponent } from './components/tablereport/tablereport.component';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from '../loginmodule/services/auth-guard.service';
import { AuthService } from '../loginmodule/services/auth.service';
import { ApiCarsImgService } from '../snapshot/services/api-cars-img.service';
import { NavbarModule } from '../navbar/navbar.module';



@NgModule({
  declarations: [MainReportComponent, TablereportComponent],
  imports: [
    CommonModule,
    FormsModule,
    NavbarModule
  ],
  exports: [MainReportComponent, TablereportComponent],
  providers:[ApiCarsImgService, AuthService, AuthGuardService]
})
export class ReportModule { }
