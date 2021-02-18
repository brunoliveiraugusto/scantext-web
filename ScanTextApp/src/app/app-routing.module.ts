import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeScanComponent } from './components/home-scan/home-scan.component';
import { ConsultaImagemProcessadaScanComponent } from './components/consulta-imagem-processada-scan/consulta-imagem-processada-scan.component';

const routes: Routes = [
  {
    path: 'home-scan',
    component: HomeScanComponent
  },
  {
    path: 'home-scan/:id',
    component: HomeScanComponent
  },
  {
    path: 'consulta-imagens-processadas',
    component: ConsultaImagemProcessadaScanComponent
  },
  {
    path: '**',
    component: HomeScanComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
