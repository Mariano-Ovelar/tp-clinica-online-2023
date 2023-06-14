import Swal from 'sweetalert2';

/* ICONOS */
/* 
success		éxito
error	    error
warning	    advertencia
info	    información
question    pregunta
*/
export class Alert {
  static mensajeConfirmacion(title: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  static mensajeError(title: string, text: string, footer?: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      footer: footer,
    });
  }
  static mensajeAviso(title: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  static mensajeAdvertecia(
    title: string,
    text: string,
    confirmButtonText: string
  ) {
   return Swal.fire({
      title: title,
      icon: 'warning',
      showCancelButton: true,
      text: text,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
    });
  }
}
