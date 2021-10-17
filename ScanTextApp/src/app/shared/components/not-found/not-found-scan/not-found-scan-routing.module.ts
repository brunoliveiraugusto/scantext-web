import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundScanComponent } from './not-found-scan.component';


const routes: Routes = [
  { path: 'not-found-scan', component: NotFoundScanComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundScanRoutingModule { }
