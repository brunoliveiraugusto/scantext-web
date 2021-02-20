import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundScanComponent } from './not-found-scan.component';
import { NotFoundScanRoutingModule } from '../not-found-routing-scan/not-found-scan-routing.module';


@NgModule({
  declarations: [
    NotFoundScanComponent
  ],
  imports: [
    CommonModule,
    NotFoundScanRoutingModule
  ],
  exports: [
    NotFoundScanComponent
  ]
})
export class NotFoundScanModule { }
