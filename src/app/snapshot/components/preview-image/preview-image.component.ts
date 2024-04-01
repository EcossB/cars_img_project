import { Component, Input } from '@angular/core';
import { imagePreview } from '../../interfaces/previewImage.interface';

@Component({
  selector: 'preview-image',
  templateUrl: './preview-image.component.html',
  styleUrl: './preview-image.component.css'
})
export class PreviewImageComponent {

  /*
   * Este input es para la comunicacion entre los componentes. El componente take image
   * le manda al padre las url data de las imagenes. 
   * el padre le manda a este componente esas url y de esa manera se pueden desplegar las imagenes
   * tomadas por el padre. De esta manera el padre y los hijos se comunican a traves de inputs y 
   * outputs.
   */
  @Input()
  carPhotos: imagePreview = {
    carleftPreview: '',
    carRightPreview: '',
    carFrontPreview: '',
    carBackPreview: ''
  }


}
