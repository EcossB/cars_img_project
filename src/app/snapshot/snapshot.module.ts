import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnapshotComponent } from './pages/main.component';
import { TakeImageComponent } from './components/take-image/take-image.component';
import { PreviewImageComponent } from './components/preview-image/preview-image.component';
import { CarDataComponent } from './components/car-data/car-data.component';
import { ApiCarsImgService } from './services/api-cars-img.service';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import { WebcamModule } from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [ SnapshotComponent, TakeImageComponent, PreviewImageComponent, CarDataComponent],
  exports:[
    SnapshotComponent
  ],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    WebcamModule,
    HttpClientModule
  ],
  providers:[ApiCarsImgService]
})
export class SnapshotModule { }
