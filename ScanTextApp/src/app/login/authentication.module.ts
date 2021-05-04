import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationScanComponent } from './components/authentication-scan/authentication-scan.component';
import { CadastroUsuarioScanComponent } from './components/cadastro-usuario-scan/cadastro-usuario-scan.component';
import { LoginScanComponent } from './components/login-scan/login-scan.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AlertModule } from 'ngx-alerts';
import { NgxLoadingModule } from 'ngx-loading';
import { RedefinirSenhaScanComponent } from './components/redefinir-senha-scan/redefinir-senha-scan.component';
import { ModalScanModule } from '../utils/modal/modal-scan/modal-scan.module';
import { AtualizarSenhaScanComponent } from './components/atualizar-senha-scan/atualizar-senha-scan.component';

@NgModule({
  declarations: [
    AuthenticationScanComponent,
    CadastroUsuarioScanComponent,
    LoginScanComponent,
    RedefinirSenhaScanComponent,
    AtualizarSenhaScanComponent
  ],
  imports: [
    CommonModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    NgxLoadingModule.forRoot({}),
    FormsModule,
    AuthenticationRoutingModule,
    ModalScanModule
  ],
  exports: [
    AuthenticationScanComponent,
    CadastroUsuarioScanComponent,
    LoginScanComponent,
    RedefinirSenhaScanComponent,
    AtualizarSenhaScanComponent
  ]
})
export class AuthenticationModule { }
