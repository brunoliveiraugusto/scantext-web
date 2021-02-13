import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeScanComponent } from './home-scan/home-scan.component';
import { ImagemProcessadaScanComponent } from './components/imagem-processada-scan/imagem-processada-scan.component';

const routes: Routes = [
  {
    path: 'home-scan',
    component: HomeScanComponent
  },
  {
    path: 'imagens-digitalizadas',
    component: ImagemProcessadaScanComponent
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
