import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImgCarData } from '../interface/imgCarData.interface';

const initReport : ImgCarData = {
  compania: '',
  sucursal: '',
  orden_Numero: 0,
  img_lateral_derecho: '',
  img_lateral_izquierdo: '',
  img_frontal: '',
  img_trasero: '',
  img_anexo1: '',
  img_anexo2: '',
  img_anexo3: ''
}

@Injectable({providedIn: 'root'})
export class BehaviorReportService {

    private report$ = new BehaviorSubject<ImgCarData>(initReport);
    constructor() { }

    get selectedReport$(): Observable<ImgCarData>{
        return this.report$.asObservable();
    }

    setReport(report: ImgCarData): void {
        this.report$.next(report);
    }

}
