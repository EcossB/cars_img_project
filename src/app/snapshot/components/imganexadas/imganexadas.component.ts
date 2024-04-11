import { Component, Input } from '@angular/core';
import { imgAnexadas } from '../../interfaces/Ianexadas.interface';

@Component({
  selector: 'imganexadas',
  templateUrl: './imganexadas.component.html',
  styleUrl: './imganexadas.component.css'
})
export class ImgAnexadasComponent {

  @Input()
  imgAnexadasPreview: imgAnexadas = {
    img_anexo1: '',
    img_anexo2: '',
    img_anexo3: ''
  }
}
