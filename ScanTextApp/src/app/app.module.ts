import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeScanComponent } from './home-scan/home-scan.component';
import { HttpClientModule } from '@angular/common/http';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AlertModule } from 'ngx-alerts';
import { NavbarScanComponent } from './navbar-scan/navbar-scan.component';
import { NgxLoadingModule } from 'ngx-loading';
import { FooterScanComponent } from './footer-scan/footer-scan.component';
import { PageTitleScanComponent } from './page-title-scan/page-title-scan.component';
import { ImagemProcessadaScanModule } from './components/imagem-processada-scan/imagem-processada-scan.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeScanComponent,
    NavbarScanComponent,
    FooterScanComponent,
    PageTitleScanComponent
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
    ImagemProcessadaScanModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
