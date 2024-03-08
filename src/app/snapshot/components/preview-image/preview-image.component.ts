import { Component, Input } from '@angular/core';
import { imagePreview } from '../../interfaces/previewImage.interface';

@Component({
  selector: 'preview-image',
  templateUrl: './preview-image.component.html',
  styleUrl: './preview-image.component.css'
})
export class PreviewImageComponent {

  @Input()
  carPhotos: imagePreview = {
    carleftPreview: '',
    carRightPreview: '',
    carFrontPreview: '',
    carBackPreview: ''
  }


}
