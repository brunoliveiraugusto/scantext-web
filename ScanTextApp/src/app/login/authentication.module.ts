import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationScanComponent } from './components/authentication-scan/authentication-scan.component';
import { CadastroUsuarioScanComponent } from './components/cadastro-usuario-scan/cadastro-usuario-scan.component';
import { LoginScanComponent } from './components/login-scan/login-scan.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AlertModule } from 'ngx-alerts';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    AuthenticationScanComponent,
    CadastroUsuarioScanComponent,
    LoginScanComponent
  ],
  imports: [
    CommonModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    NgxLoadingModule.forRoot({}),
    FormsModule,
    AuthenticationRoutingModule
  ],
  exports: [
    AuthenticationScanComponent,
    CadastroUsuarioScanComponent,
    LoginScanComponent
  ]
})
export class AuthenticationModule { }
