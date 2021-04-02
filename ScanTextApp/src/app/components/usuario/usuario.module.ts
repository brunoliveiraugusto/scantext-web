import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilUsuarioScanComponent } from './perfil-usuario-scan/perfil-usuario-scan.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { MainUsuarioScanComponent } from './main-usuario-scan/main-usuario-scan.component';
import { NavbarScanModule } from '../../navbar-scan/navbar-scan.module';
import { FooterScanModule } from '../../footer-scan/footer-scan.module';
import { AlertModule } from 'ngx-alerts';


@NgModule({
  declarations: [
    PerfilUsuarioScanComponent,
    MainUsuarioScanComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    NavbarScanModule,
    FooterScanModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
  ],
  exports: [
    PerfilUsuarioScanComponent
  ]
})
export class UsuarioModule { }
