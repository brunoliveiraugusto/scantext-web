import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarScanComponent } from './navbar-scan.component';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [
    NavbarScanComponent
  ],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({})
  ],
  exports: [
    NavbarScanComponent
  ]
})
export class NavbarScanModule { }
