import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SnapshotModule } from './snapshot/snapshot.module';
import { LoginModule } from './loginmodule/loginmodule.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebcamModule } from 'ngx-webcam';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SnapshotModule,
    WebcamModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
