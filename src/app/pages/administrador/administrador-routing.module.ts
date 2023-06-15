import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './administrador.component';
import { SeccionUsuariosComponent } from './pages/seccion-usuarios/seccion-usuarios.component';

const routes: Routes = [
  { path: '', component: AdministradorComponent },
  { path: 'seccion-usuarios', component: SeccionUsuariosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorRoutingModule {}
