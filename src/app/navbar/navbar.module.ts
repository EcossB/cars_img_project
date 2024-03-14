import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarModuleComponent } from './pages/nabar-module.component';



@NgModule({
  declarations: [
    NavbarComponent, NavbarModuleComponent
  ],
  exports:[NavbarModuleComponent],
  imports: [
    CommonModule
  ]
})
export class NavbarModule { }
