import { Component } from '@angular/core';

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.scss']
})
export class SeccionUsuariosComponent {
  usuarioAtrapado?:any;
  hideForm:boolean=false;
  mostrarForm(){
    this.hideForm=true
  }
}
