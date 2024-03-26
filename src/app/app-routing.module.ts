import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './loginmodule/components/login/login.component';
import { SnapshotComponent } from './snapshot/pages/main.component';
import { AuthGuardService } from './loginmodule/services/auth-guard.service';
import { MainReportComponent } from './reportmodule/pages/main-report.component';
import { TablereportComponent } from './reportmodule/components/tablereport/tablereport.component';

const routes: Routes = [
  {path: '', title: 'Login', component:LoginComponent},
  {path: 'capturar', title: 'Capturar', canActivate: [() => inject(AuthGuardService).canActivate()] , component:SnapshotComponent},
  {path: 'reporte', title: 'Reporte', canActivate: [() => inject(AuthGuardService).canActivate()] ,component:MainReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
