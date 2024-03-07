import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnapshotComponent } from './pages/main.component';
import { TakeImageComponent } from './components/take-image/take-image.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import { WebcamModule } from 'ngx-webcam';



@NgModule({
  declarations: [ SnapshotComponent, TakeImageComponent],
  exports:[
    SnapshotComponent
  ],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    WebcamModule
  ]
})
export class SnapshotModule { }
