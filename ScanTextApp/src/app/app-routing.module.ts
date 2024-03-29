import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessarImagemScanComponent } from './components/imagem/processar-imagem-scan/processar-imagem-scan.component';
import { ConsultaImagemProcessadaScanComponent } from './components/imagem/consulta-imagem-processada-scan/consulta-imagem-processada-scan.component';
import { AuthGuard } from './core/login/shared/auth.guard';
import { MainScanComponent } from './core/main/main-scan/main-scan.component';
import { ConfiguracaoScanComponent } from './components/configurar/configuracao-scan/configuracao-scan.component';

const routes: Routes = [
  {
    path: '',
    component: MainScanComponent,
    children: [
      { path: '', redirectTo: 'processar-imagem', pathMatch: 'full' },
      { path: 'processar-imagem', component: ProcessarImagemScanComponent },
      { path: 'processar-imagem/:id', component: ProcessarImagemScanComponent },
      { path: 'consulta-imagens-processadas', component: ConsultaImagemProcessadaScanComponent },
      { path: 'configuracao', component: ConfiguracaoScanComponent, }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./components/usuario/usuario.module')
      .then(m => m.UsuarioModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./shared/components/not-found/not-found-scan/not-found-scan.module')
      .then(m => m.NotFoundScanModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./core/login/authentication.module')
      .then(m => m.AuthenticationModule)
  },
  { path: '**', redirectTo: 'not-found-scan', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
