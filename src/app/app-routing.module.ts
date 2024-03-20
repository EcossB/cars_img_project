import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './loginmodule/components/login/login.component';
import { SnapshotComponent } from './snapshot/pages/main.component';

const routes: Routes = [
  {path: '', title: 'Login', component:LoginComponent},
  {path: 'capturar', title: 'ProjecImg', component:SnapshotComponent},
  {path: '**', title: 'ProjecImg', component:SnapshotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
