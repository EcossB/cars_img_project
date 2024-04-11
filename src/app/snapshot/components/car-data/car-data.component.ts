import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { ApiCarsImgService } from '../../services/api-cars-img.service';
import { chasis } from '../../interfaces/chasis.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { tap, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderVehicles } from '../../interfaces/Order.interface';

@Component({
  selector: 'car-data',
  templateUrl: './car-data.component.html',
  styleUrl: './car-data.component.css'
})
export class CarDataComponent implements OnInit {

  /* 
  TODO: Inyeccion de servicios y dependencias a traves de composicion. 
  * public apiService: ApiCarsImgService, // Para interactuar con la API.
  * modalservice es para poder abrir modales, ahora mismo no se esta utilizando. 
   */
  constructor(
    public apiService: ApiCarsImgService,
    private modalService: BsModalService) { }

  /* 
    Array que contendra las ordenes que estan pendientes para tirar fotos.  
  */
  vehicleData: Vehicle[] = [];

  /*
   * propiedad la cual utilizamos para cuando seleccionamos una fila en la tabla 
   * Esto lo que hace es que el contenedor que muestra la fila seleccionada esta relacionada
   * con esta propiedad.
   */
  vehicleObtained: Vehicle = {
    compania: '',
    sucursal: '',
    orden_Numero: 0,
    fecha_orden: Date.now(),
    nombre_cliente: '',
    marca: 0,
    modelo: 0,
    placa: ''
  }

  @Output()
  public onNewDataTable: EventEmitter<Vehicle> = new EventEmitter;


  /*
  * Este metodo lo que hace es utilizar el servicio apiService, y suscribo el metodo getAllvehicleData
  * esto lo que hace es tomar todos los datos de orden del vehiculo y adentrarlo dentro del array de
  * datos.
  
  */
  getAllVehicleData(): void {
    this.apiService.getAllVehiclesData(localStorage.getItem('Token'))
      .subscribe({
        next: (data: any) => {
          this.vehicleData = data;
          console.log(data);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      })
  }

  /**
   * 
   * @param event 
   * * Este metodo lo que sirve es para el output del hijo al padre.
   */
  onSelected(event: any) {
    var statev = event.target.textContent
    //this.vehicleObtained = statev;
    console.log(this.vehicleObtained);
  }

  /** 
   * 
   * @param c Es la orden seleccionada en la filas de las tablas.
   * 
    ** Igualamos las propiedades del parametro con las propiedades de vehicleObtained

  * *Agregue una validacion para que siempre que presionen una fila esta se resalte de verde
    manejando el event, accedo al elementro padre del td seleccionado y le cambio el background
    para el color verde, siempre y cuando tenga el background por ''.
   */
  selectRow(c: Vehicle, $event: any) {
    
    console.log($event.target.parentElement.id);
    
    if($event.target.parentElement.style.background === ''){

      $event.target.parentElement.style.background = 'lightgreen';

    } else if($event.target.parentElement.style.background === 'lightgreen'){

      $event.target.parentElement.style.background = '';

    } 

    this.vehicleObtained.compania = c.compania;
    this.vehicleObtained.sucursal = c.sucursal;
    this.vehicleObtained.orden_Numero = c.orden_Numero;
    this.vehicleObtained.nombre_cliente = c.nombre_cliente;
    this.vehicleObtained.marca = c.marca;
    this.vehicleObtained.modelo = c.modelo;
    this.vehicleObtained.fecha_orden = c.fecha_orden;
    this.vehicleObtained.placa = c.placa;

    this.onNewDataTable.emit(this.vehicleObtained);

  }


  ngOnInit(): void {
    this.getAllVehicleData();
  }

}


/*

!Logica que se utilizaba cuando Existia el buscar por chasis la orden.

loading: boolean = false;

chasis$!: Observable<chasis[]>;

private searchTerms = new Subject<string>();

selectedChasis: string = '';


modalRef?: BsModalRef;

  openModal(template: TemplateRef<void>): void{
    this.modalRef = this.modalService.show(template);
  }

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

search(chasis: string):void {

   Im doing this because when we erase the input it throws a 400, so if the user erase 
   the whole thing on the input it wont throw a 400. 

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
    this.apiService.getChasis(chasis, localStorage.getItem('Token'))),
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
*/