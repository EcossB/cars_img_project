import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'take-image',
  templateUrl: './take-image.component.html',
  styleUrl: './take-image.component.css'
})
export class TakeImageComponent {


  constructor(private modalService: BsModalService) {}

  carRight: Subject<void> = new Subject();
  carleft: Subject<void> = new Subject();
  carFront: Subject<void> = new Subject();
  carBack: Subject<void> = new Subject();


  /** ------ Open modal Boot Strap -------- */

  modalRef?: BsModalRef;
  openModal(template: TemplateRef<void>): void{
    this.modalRef = this.modalService.show(template);
  }


  /** ----  checking camera user permissions. -----*/

  checkPermissions(): void{
    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then((res) => {
      console.log("response ", res);
    }).catch(err => {
      console.log(err);
    });
  }


  /* --- getting triggers of the diff cameras. */

  get $carRight(): Observable<void> {
    return this.carRight.asObservable();
  }

  snapshot(event: WebcamImage): void{
    console.log(event);
  }

  captureImage( carItem: Subject<void> ): void {
    carItem.next();
  }




}
