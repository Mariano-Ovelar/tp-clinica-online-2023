import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { AdministradorComponent } from './administrador.component';
import { SeccionUsuariosComponent } from './pages/seccion-usuarios/seccion-usuarios.component';
import { TurnosComponent } from './pages/turnos/turnos.component';
import { UserComponentsModule } from 'src/app/components/user-components/user-components.module';
import { RegistroModule } from 'src/app/components/registro/registro.module';


@NgModule({
  declarations: [
    AdministradorComponent,
    SeccionUsuariosComponent,
    TurnosComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    UserComponentsModule,
    RegistroModule
  ]
})
export class AdministradorModule { }
