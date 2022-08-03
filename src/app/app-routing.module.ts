import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Vamos a aplicar la tecnica de lazy-loading, es decir, vamos a cargar un modulo a pedido.
// Cuando se active la ruta pertinente, se va a ejecutar la funcion loadChildren y se
// cargan las rutas hijas correspondientes al modulo que carguemos.
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.module').then((module) => module.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
