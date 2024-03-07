import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'take-image',
  templateUrl: './take-image.component.html',
  styleUrl: './take-image.component.css'
})
export class TakeImageComponent {

  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

SendMessage() {
alert("Hola mundo");
}

}
