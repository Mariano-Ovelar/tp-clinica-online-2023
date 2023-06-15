import { Component, Input } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';

@Component({
  selector: 'app-detalle-paciente',
  templateUrl: './detalle-paciente.component.html',
  styleUrls: ['./detalle-paciente.component.scss']
})
export class DetallePacienteComponent {
  @Input() usuario?: Paciente;

}
