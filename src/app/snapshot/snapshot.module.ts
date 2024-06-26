import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { SnapshotComponent } from './pages/main.component';
import { TakeImageComponent } from './components/take-image/take-image.component';
import { PreviewImageComponent } from './components/preview-image/preview-image.component';
import { CarDataComponent } from './components/car-data/car-data.component';
import { ApiCarsImgService } from './services/api-cars-img.service';
import { NavbarModule } from '../navbar/navbar.module';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import { WebcamModule } from 'ngx-webcam';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../loginmodule/services/auth.service';
import { AuthGuardService } from '../loginmodule/services/auth-guard.service';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ImgAnexadasComponent} from './components/imganexadas/imganexadas.component';


@NgModule({
  declarations: [ SnapshotComponent, TakeImageComponent, PreviewImageComponent, CarDataComponent, ImgAnexadasComponent],
  exports:[
    SnapshotComponent
  ],
  imports: [
    CommonModule, 
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    WebcamModule,
    HttpClientModule,
    FormsModule,
    NavbarModule,
    AlertModule.forRoot(),
    NgxUiLoaderModule
  ],
  providers:[ApiCarsImgService, AuthService, AuthGuardService]
})
export class SnapshotModule { }
