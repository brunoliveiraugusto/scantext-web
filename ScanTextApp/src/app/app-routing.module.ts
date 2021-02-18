import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessarImagemScanComponent } from './components/processar-imagem-scan/processar-imagem-scan.component';
import { ConsultaImagemProcessadaScanComponent } from './components/consulta-imagem-processada-scan/consulta-imagem-processada-scan.component';

const routes: Routes = [
  {
    path: 'processar-imagem',
    component: ProcessarImagemScanComponent
  },
  {
    path: 'processar-imagem/:id',
    component: ProcessarImagemScanComponent
  },
  {
    path: 'consulta-imagens-processadas',
    component: ConsultaImagemProcessadaScanComponent
  },
  {
    path: '**',
    component: ProcessarImagemScanComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
