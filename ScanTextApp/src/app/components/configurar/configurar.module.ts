import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracaoScanComponent } from './configuracao-scan/configuracao-scan.component';
import { AlertModule } from 'ngx-alerts';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { PageTitleScanModule } from 'src/app/page-title-scan/page-title-scan.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    ConfiguracaoScanComponent
  ],
  imports: [
    CommonModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    FormsModule,
    NgxLoadingModule.forRoot({}),
    PageTitleScanModule,
    NgMultiSelectDropDownModule
  ],
  exports: [
    ConfiguracaoScanComponent
  ]
})
export class ConfigurarModule { }
