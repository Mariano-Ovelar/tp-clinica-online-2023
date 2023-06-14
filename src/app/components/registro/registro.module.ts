import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioEspecialistaComponent } from './formulario-especialista/formulario-especialista.component';
import { FormularioPacienteComponent } from './formulario-paciente/formulario-paciente.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormularioEspecialistaComponent,FormularioPacienteComponent],
  imports: [CommonModule,SharedModule,ReactiveFormsModule],
  exports: [FormularioEspecialistaComponent,FormularioPacienteComponent],
})
export class RegistroModule {}
