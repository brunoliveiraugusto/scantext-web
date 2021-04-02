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
import { NavbarScanComponent } from './navbar-scan/navbar-scan.component';
import { NgxLoadingModule } from 'ngx-loading';
import { FooterScanComponent } from './footer-scan/footer-scan.component';
import { ImagemProcessadaScanModule } from './components/imagem/consulta-imagem-processada-scan/imagem-processada-scan.module';
import { PageTitleScanModule } from './page-title-scan/page-title-scan.module';
import { LoginScanComponent } from './login/components/login-scan/login-scan.component';
import { AuthenticationScanComponent } from './login/components/authentication-scan/authentication-scan.component';
import { MainScanComponent } from './main/main-scan/main-scan.component';
import { NotFoundScanModule } from './utils/components/not-found/not-found-scan/not-found-scan.module';
import { CadastroUsuarioScanComponent } from './login/components/cadastro-usuario-scan/cadastro-usuario-scan.component';
import { HeaderInterceptor } from './services/header-interceptor';
import { UsuarioModule } from './components/usuário/usuario.module';

@NgModule({
  declarations: [
    AppComponent,
    ProcessarImagemScanComponent,
    NavbarScanComponent,
    FooterScanComponent,
    LoginScanComponent,
    AuthenticationScanComponent,
    MainScanComponent,
    CadastroUsuarioScanComponent
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
    UsuarioModule
  ],
  exports: [
    ProcessarImagemScanComponent
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
