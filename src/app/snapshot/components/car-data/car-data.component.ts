import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { ApiCarsImgService } from '../../services/api-cars-img.service';
import { chasis } from '../../interfaces/chasis.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {tap, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Vehicle } from '../../interfaces/vehicle.interface';

@Component({
  selector: 'car-data',
  templateUrl: './car-data.component.html',
  styleUrl: './car-data.component.css'
})
export class CarDataComponent implements OnInit{

loading: boolean = false;

chasis$!: Observable<chasis[]>;

private searchTerms = new Subject<string>();

selectedChasis: string = '';

vehicleObtained: Vehicle = {
  compania: '',
  sucursal: '',
  orden_Numero: 0,
  chasis: '',
  marca: 0,
  modelo: 0,
  ano: 0,
  placa: '',
  color: 0
};

@Output()
public onNewDataTable: EventEmitter<Vehicle> = new EventEmitter;

constructor(
  public apiService: ApiCarsImgService,
  private modalService: BsModalService ){}



/** ------ Open modal Boot Strap -------- */

modalRef?: BsModalRef;

openModal(template: TemplateRef<void>): void{
  this.modalRef = this.modalService.show(template);
}

/**-------------------------------------------- */

search(chasis: string):void {
  /** Im doing this because when we erase the input it throws a 400, so if the user erase 
   * the whole thing on the input it wont throw a 400. 
   */
  if(chasis.length > 0){
    this.searchTerms.next(chasis);
  } else
  this.SearchChasis();
}

SearchChasis():void {
  this.chasis$ = this.searchTerms.pipe(
    tap((_) => (this.loading = true)),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((chasis: string) => 
    this.apiService.getChasis(chasis)),
    tap((_) => (this.loading = false))
  );
}


getVehicleByChasis(chasis: string){
  this.apiService.getVehicleByChasis(chasis).subscribe({
    next: (vehicle: any) => {
      console.log(vehicle);
      this.vehicleObtained = vehicle;
      this.onNewDataTable.emit(this.vehicleObtained);
    },
    error: (error) => {
      console.log(error);
    }
  });
}

onSelected(event: any) {
  var statev = event.target.textContent
  this.selectedChasis = statev;
  console.log(this.selectedChasis);
}











ngOnInit(): void {
  this.SearchChasis();
}


}
