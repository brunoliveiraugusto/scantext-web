import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessarImagemScanComponent } from './components/imagem/processar-imagem-scan/processar-imagem-scan.component';
import { ConsultaImagemProcessadaScanComponent } from './components/imagem/consulta-imagem-processada-scan/consulta-imagem-processada-scan.component';
import { LoginScanComponent } from './login/components/login-scan/login-scan.component';
import { AuthGuard } from './login/shared/auth.guard';
import { AuthenticationScanComponent } from './login/components/authentication-scan/authentication-scan.component';
import { HomeScanComponent } from './home/home-scan/home-scan.component';
import { CadastroUsuarioScanComponent } from './login/components/cadastro-usuario-scan/cadastro-usuario-scan.component';

const routes: Routes = [
  {
    path: '',
    component: HomeScanComponent,
    children: [
      { path: '', redirectTo: 'processar-imagem', pathMatch: 'full' },
      { path: 'processar-imagem', component: ProcessarImagemScanComponent },
      { path: 'processar-imagem/:id', component: ProcessarImagemScanComponent },
      { path: 'consulta-imagens-processadas', component: ConsultaImagemProcessadaScanComponent },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./utils/components/not-found/not-found-scan/not-found-scan.module')
      .then(m => m.NotFoundScanModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthenticationScanComponent,
    children: [
      { path: 'login', component: LoginScanComponent },
      { path: 'cadastrar', component: CadastroUsuarioScanComponent }
    ]
  }, 
  { path: '**', redirectTo: 'not-found-scan', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
