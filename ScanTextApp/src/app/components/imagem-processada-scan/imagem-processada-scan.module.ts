import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagemProcessadaScanComponent } from './imagem-processada-scan.component';
import { PageTitleScanModule } from '../../page-title-scan/page-title-scan.module';


@NgModule({
  declarations: [
    ImagemProcessadaScanComponent
  ],
  imports: [
    CommonModule,
    PageTitleScanModule
  ],
  exports: [
    ImagemProcessadaScanComponent
  ]
})
export class ImagemProcessadaScanModule { }
