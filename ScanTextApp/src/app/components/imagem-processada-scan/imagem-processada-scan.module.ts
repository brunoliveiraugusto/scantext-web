import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaImagemProcessadaScanComponent } from './consulta-imagem-processada-scan.component';
import { PageTitleScanModule } from '../../page-title-scan/page-title-scan.module';
import { NgxLoadingModule } from 'ngx-loading';
import { AlertModule } from 'ngx-alerts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    ConsultaImagemProcessadaScanComponent
  ],
  imports: [
    CommonModule,
    PageTitleScanModule,
    NgxLoadingModule.forRoot({}),
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    NgxDatatableModule
  ],
  exports: [
    ConsultaImagemProcessadaScanComponent
  ]
})
export class ImagemProcessadaScanModule { }
