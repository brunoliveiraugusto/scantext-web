import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtualizarSenhaScanComponent } from './components/atualizar-senha-scan/atualizar-senha-scan.component';
import { AuthenticationScanComponent } from './components/authentication-scan/authentication-scan.component';
import { CadastroUsuarioScanComponent } from './components/cadastro-usuario-scan/cadastro-usuario-scan.component';
import { LoginScanComponent } from './components/login-scan/login-scan.component';
import { RedefinirSenhaScanComponent } from './components/redefinir-senha-scan/redefinir-senha-scan.component';


const routes: Routes = [
  {
    path: '',
    component: AuthenticationScanComponent,
    children: [
      { path: 'login', component: LoginScanComponent },
      { path: 'cadastrar', component: CadastroUsuarioScanComponent },
      { path: 'redefinir-senha', component: RedefinirSenhaScanComponent },
      { path: 'atualizar-senha/:token', component: AtualizarSenhaScanComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
