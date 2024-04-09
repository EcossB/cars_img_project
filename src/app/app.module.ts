import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SnapshotModule } from './snapshot/snapshot.module';
import { LoginModule } from './loginmodule/loginmodule.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebcamModule } from 'ngx-webcam';
import { NavbarModule } from './navbar/navbar.module';
import { FormsModule } from '@angular/forms';
import { ReportModule } from './reportmodule/report.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptorService } from './snapshot/services/api-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // para las redirecciones de las urls.
    SnapshotModule, // modulo que contiene los componentes de camara, ordenes y previsualizacion de imagenes
    WebcamModule, // modulo para poder habitar ngx webcam y asi usar la camara del dipositivo
    LoginModule, // modulo del login Creado por mi para la autenticacion y autorizacion.
    NavbarModule, // modulo creado por mi que contiene el navbar de la app.
    FormsModule, // Modulo de angular para el uso de ngModel.
    ReportModule, // modulo de reporte creado por mi para crear reporte de las imagenes de los autos.
    NgxUiLoaderModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:ApiInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
