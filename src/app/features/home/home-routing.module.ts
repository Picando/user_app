import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

/* 
  Las rutas tienen varias llaves:
  -> path: La ruta que debe activar el navegador para que se muestre el determinado componente.
  -> component: El componente que se va a proyectar en la ruta.
*/

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
