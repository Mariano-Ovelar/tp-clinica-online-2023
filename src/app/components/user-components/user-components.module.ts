import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoUserComponent } from './listado-user/listado-user.component';
import { FormsModule } from '@angular/forms';
import { FiltroTipoUsuarioPipe } from 'src/app/pipes/filtro-tipo-usuario.pipe';
import { DetallePacienteComponent } from './detalle-paciente/detalle-paciente.component';
import { DetalleEspecialistaComponent } from './detalle-especialista/detalle-especialista.component';
import { DetalleAdminComponent } from './detalle-admin/detalle-admin.component';

@NgModule({
  declarations: [
    ListadoUserComponent,
    FiltroTipoUsuarioPipe,
    DetallePacienteComponent,
    DetalleEspecialistaComponent,
    DetalleAdminComponent,
  ],
  exports: [
    ListadoUserComponent,
    DetallePacienteComponent,
    DetalleEspecialistaComponent,
    DetalleAdminComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class UserComponentsModule {}
