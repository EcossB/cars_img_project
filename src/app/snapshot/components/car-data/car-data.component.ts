import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiCarsImgService } from '../../services/api-cars-img.service';
import { chasis } from '../../interfaces/chasis.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {tap, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'car-data',
  templateUrl: './car-data.component.html',
  styleUrl: './car-data.component.css'
})
export class CarDataComponent implements OnInit{


loading: boolean = false;
chasis$!: Observable<chasis[]>;
private searchTerms = new Subject<string>();
chasisAvaible: chasis[] = [];

constructor(
  public apiService: ApiCarsImgService,
  private modalService: BsModalService ){}



/** ------ Open modal Boot Strap -------- */

modalRef?: BsModalRef;

openModal(template: TemplateRef<void>): void{
  this.modalRef = this.modalService.show(template);
}

/**-------------------------------------------- */


search(chasis: string) {

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

ngOnInit(): void {
  this.SearchChasis();
}


}
