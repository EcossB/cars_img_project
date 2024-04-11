import { Component, EventEmitter, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { imagePreview } from '../../interfaces/previewImage.interface';
import { CheckGroup } from '../../interfaces/checkgroup.interface';
import { imgAnexadas } from '../../interfaces/Ianexadas.interface';


@Component({
  selector: 'take-image',
  templateUrl: './take-image.component.html',
  styleUrl: './take-image.component.css'
})
export class TakeImageComponent {

  constructor(private modalService: BsModalService) {}

  saved: boolean = false;

  /* ----- These properties are the subjects that holds image --------*/

  carRight: Subject<void> = new Subject();
  carleft: Subject<void> = new Subject();
  carFront: Subject<void> = new Subject();
  carBack: Subject<void> = new Subject();

  imageCarrete: imagePreview = {
    carRightPreview: '',
    carleftPreview: '',
    carFrontPreview: '',
    carBackPreview: ''
  };

  imgAnexada: imgAnexadas = {
    img_anexo1: '',
    img_anexo2: '',
    img_anexo3: ''
  }

  inputsChecked: CheckGroup ={
    check1: false,
    check2: false,
    check3: false,
    check4: false
  }

  @Output()
  public onNewPhoto: EventEmitter<imagePreview> = new EventEmitter;


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

  /* ---------------------Trigger, snapshotEvent and capture image for right side of vehicle--------------------------*/

  get $carRight(): Observable<void> {
    return this.carRight.asObservable();
  }

  snapshot(event: WebcamImage): void{
    this.imageCarrete.carRightPreview = event.imageAsDataUrl;
  }

  captureImageRight(): void {

    this.saved = true;
    this.carRight.next();
    this.onNewPhoto.emit(this.imageCarrete);
    this.inputsChecked.check1 = true;
    setTimeout(() => {this.saved = false;}, 2000);
  }

  /* --------------------- Trigger, snapshotEvent and capture image for left side of vehicle--------------------------*/


  get $carLeft(): Observable<void> {
    return this.carleft.asObservable();
  }

  snapshot1(event: WebcamImage) {
    this.imageCarrete.carleftPreview = event.imageAsDataUrl;
  }

  captureImageLeft( ): void {

    this.saved = true;
    this.carleft.next();
    this.onNewPhoto.emit(this.imageCarrete);
    this.inputsChecked.check4 = true;
    setTimeout(() => {this.saved = false;}, 2000);



  }


  /* ---------------------Trigger, snapshotEvent and capture image for front side of vehicle--------------------------*/


  get $carFront(): Observable<void> {
    return this.carFront.asObservable();
  }

  snapshot2(event: WebcamImage) {
    this.imageCarrete.carFrontPreview = event.imageAsDataUrl;
  }

  captureImageFront( ): void {

    this.saved = true;
    this.carFront.next();
    this.onNewPhoto.emit(this.imageCarrete);
    this.inputsChecked.check2 = true;
    setTimeout(() => {this.saved = false;}, 2000);



  }

    /* ---------------------Trigger, snapshotEvent and capture image for back side of vehicle--------------------------*/


  get $carBack(): Observable<void> {
    return this.carBack.asObservable();
  }

  snapshot3(event: WebcamImage) {
    this.imageCarrete.carBackPreview = event.imageAsDataUrl;
  }

  captureImageBack( ): void {

    this.saved = true;
    this.carBack.next();
    this.onNewPhoto.emit(this.imageCarrete);
    this.inputsChecked.check3 = true;
    setTimeout(() => {this.saved = false;}, 2000);

  }




}
