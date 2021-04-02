import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilUsuarioScanComponent } from './perfil-usuario-scan/perfil-usuario-scan.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { MainUsuarioScanComponent } from './main-usuario-scan/main-usuario-scan.component';


@NgModule({
  declarations: [
    PerfilUsuarioScanComponent,
    MainUsuarioScanComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ],
  exports: [
    PerfilUsuarioScanComponent
  ]
})
export class UsuarioModule { }
