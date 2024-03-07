import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SnapshotModule } from './snapshot/snapshot.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SnapshotModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
