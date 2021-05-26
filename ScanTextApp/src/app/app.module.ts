import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcessarImagemScanComponent } from './components/imagem/processar-imagem-scan/processar-imagem-scan.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AlertModule } from 'ngx-alerts';
import { NavbarScanModule } from './navbar-scan/navbar-scan.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FooterScanModule } from './footer-scan/footer-scan.module';
import { ImagemProcessadaScanModule } from './components/imagem/consulta-imagem-processada-scan/imagem-processada-scan.module';
import { PageTitleScanModule } from './page-title-scan/page-title-scan.module';
import { MainScanComponent } from './main/main-scan/main-scan.component';
import { NotFoundScanModule } from './utils/components/not-found/not-found-scan/not-found-scan.module';
import { HeaderInterceptor } from './services/header-interceptor';
import { ModalScanModule } from './utils/modal/modal-scan/modal-scan.module';
import { AuthenticationModule } from './login/authentication.module';
import { ConfigurarModule } from './components/configurar/configurar.module';

@NgModule({
  declarations: [
    AppComponent,
    ProcessarImagemScanComponent,
    MainScanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    NgxLoadingModule.forRoot({}),
    ImagemProcessadaScanModule,
    PageTitleScanModule,
    NotFoundScanModule,
    NavbarScanModule,
    FooterScanModule,
    ModalScanModule,
    AuthenticationModule,
    ConfigurarModule
  ],
  exports: [
    ProcessarImagemScanComponent
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
