import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessarImagemScanComponent } from './components/imagem/processar-imagem-scan/processar-imagem-scan.component';
import { ConsultaImagemProcessadaScanComponent } from './components/imagem/consulta-imagem-processada-scan/consulta-imagem-processada-scan.component';
import { LoginScanComponent } from './login/components/login-scan/login-scan.component';
import { AuthGuard } from './login/shared/auth.guard';
import { AuthenticationScanComponent } from './login/components/authentication-scan/authentication-scan.component';
import { HomeScanComponent } from './home/home-scan/home-scan.component';

const routes: Routes = [
  {
    path: '',
    component: HomeScanComponent,
    children: [
      { path: 'processar-imagem', component: ProcessarImagemScanComponent },
      { path: 'processar-imagem/:id', component: ProcessarImagemScanComponent },
      { path: 'consulta-imagens-processadas', component: ConsultaImagemProcessadaScanComponent },
      { path: '**', component: ProcessarImagemScanComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthenticationScanComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' }, 
      { path: 'login', component: LoginScanComponent }
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
