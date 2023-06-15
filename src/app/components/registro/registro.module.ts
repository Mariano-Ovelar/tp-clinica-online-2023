import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioEspecialistaComponent } from './formulario-especialista/formulario-especialista.component';
import { FormularioPacienteComponent } from './formulario-paciente/formulario-paciente.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormularioAdminComponent } from './formulario-admin/formulario-admin.component';

@NgModule({
  declarations: [FormularioEspecialistaComponent,FormularioPacienteComponent, FormularioAdminComponent],
  imports: [CommonModule,SharedModule,ReactiveFormsModule],
  exports: [FormularioEspecialistaComponent,FormularioPacienteComponent,FormularioAdminComponent],
})
export class RegistroModule {}
