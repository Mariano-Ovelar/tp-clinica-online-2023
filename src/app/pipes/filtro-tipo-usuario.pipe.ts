import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTipoUsuario'
})
export class FiltroTipoUsuarioPipe implements PipeTransform {

  transform(usuarios: any[], tipoUsuarioSeleccionado: string): any[] {
    if (!tipoUsuarioSeleccionado || tipoUsuarioSeleccionado === '') {
      return usuarios; // Retorna todos los usuarios si no se selecciona un tipo de usuario
    }

    return usuarios.filter(usuario => usuario.tipoUser === tipoUsuarioSeleccionado);
  }

}
