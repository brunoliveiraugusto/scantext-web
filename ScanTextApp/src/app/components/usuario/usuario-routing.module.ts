import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainUsuarioScanComponent } from './main-usuario-scan/main-usuario-scan.component';
import { PerfilUsuarioScanComponent } from './perfil-usuario-scan/perfil-usuario-scan.component';


const routes: Routes = [
  {
    path: '',
    component: MainUsuarioScanComponent,
    children: [
      { path: 'perfil', component: PerfilUsuarioScanComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
