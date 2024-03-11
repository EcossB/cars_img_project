import { Component } from '@angular/core';
import { imagePreview } from '../interfaces/previewImage.interface';

@Component({
  selector: 'main-page-snapshot',
  templateUrl: 'main.component.html'
})

export class SnapshotComponent  {

  title='SnapShotComponent';

  /** Objeto que va almacenar los valores del preview de las imagenes. */

  imagePrevieCars: imagePreview = {
    carleftPreview: '',
    carRightPreview: '',
    carFrontPreview: '',
    carBackPreview: ''
  }

  onNewPhoto(photo: imagePreview): void {
    console.log(photo);
    this.imagePrevieCars.carRightPreview = photo.carRightPreview;
    this.imagePrevieCars.carleftPreview = photo.carleftPreview;
    this.imagePrevieCars.carFrontPreview = photo.carFrontPreview;
    this.imagePrevieCars.carBackPreview = photo.carBackPreview;
  }
}
