import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor{

  constructor(private ngxLoaderService :NgxUiLoaderService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("*INGRESANDO AL INTERCEPTOR*");
    this.ngxLoaderService.start()
    return next.handle(req).pipe(finalize(() => this.ngxLoaderService.stop()));

  }
}
