import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './loginmodule/components/login/login.component';
import { SnapshotComponent } from './snapshot/pages/main.component';
import { AuthGuardService } from './loginmodule/services/auth-guard.service';
import { MainReportComponent } from './reportmodule/pages/main-report.component';
import { TablereportComponent } from './reportmodule/components/tablereport/tablereport.component';
import { PdfstructureComponent } from './reportmodule/components/tablereport/pdfstructure/pdfstructure.component';

/**
 * Esta constante tiene adentro a donde dirigen las rutas en la url.
 *
 * * -- El primero '' al componente del login.
 *
 * * -- El segundo 'capturar' redirige al componente principal y solo puede
 * *    ser accedido si el usuario tiene su token.
 *
 * * -- El tercero 'reporte' redirige al apartado de reportes y tambien solo es accedido
 * *    si tiene su token a la hora de iniciar sesion.
 *
 *
 * ! Como funciona el can activate?
 * * El canActive lo que hace es que injecta un servicio llamado AuthGuardService
 * * el cual tiene un metodo llamado canActivate y retorna un booleano dependiendo de si el
 * * local storage del navegador contiene el token de inicio de sesion del usuario.
 * * Si retorna un true lo dejara entrar, si no tiene un token, pues no lo dejara pasar.
 *
 *
 */
const routes: Routes = [
  {path: '', title: 'Login', component:LoginComponent},
  {path: 'capturar', title: 'Melien Img', canActivate: [() => inject(AuthGuardService).canActivate()] , component:SnapshotComponent},
  {path: 'reporte', title: 'Reporte Imagenes', canActivate: [() => inject(AuthGuardService).canActivate()] ,component:MainReportComponent},
  {path: 'Preview', title: 'Preview Reporte', canActivate: [() => inject(AuthGuardService).canActivate()] ,component:PdfstructureComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
