import { DatePipe } from '@angular/common';

export class Fecha {
  static getFechaActual(): string {
    const fechaActual = new Date();
    const dia = fechaActual.getDate(); // Obtiene el día actual (1-31)
    const mes = fechaActual.getMonth() + 1; // Obtiene el mes actual (0-11), se suma 1 para obtener el mes en formato de 1 a 12
    const año = fechaActual.getFullYear(); // Obtiene el año actual

    // Asegurar que el día y el mes tengan siempre dos dígitos
    const diaStr = dia.toString().padStart(2, '0');
    const mesStr = mes.toString().padStart(2, '0');

    // Formatear la fecha en formato "yyyy/mm/dd"
    const fechaStr = `${año}-${mesStr}-${diaStr}`;
    return fechaStr;
  }

  static getHoraActual(): string {
    const fechaActual = new Date();
    const horas = fechaActual.getHours(); // Obtiene las horas actuales (0-23)
    const minutos = fechaActual.getMinutes(); // Obtiene los minutos actuales (0-59)
    const segundos = fechaActual.getSeconds(); // Obtiene los segundos actuales (0-59)

    // Asegurar que las horas, los minutos y los segundos tengan siempre dos dígitos
    const horasStr = horas.toString().padStart(2, '0');
    const minutosStr = minutos.toString().padStart(2, '0');
    const segundosStr = segundos.toString().padStart(2, '0');

    // Formatear la hora en formato "hh:mm:ss"
    const horaStr = `${horasStr}:${minutosStr}:${segundosStr}`;
    return horaStr;
  }
  static getHoraMinutosActual(): string {
    const fechaActual = new Date();
    const horas = fechaActual.getHours(); // Obtiene las horas actuales (0-23)
    const minutos = fechaActual.getMinutes(); // Obtiene los minutos actuales (0-59)

    // Asegurar que las horas, los minutos y los segundos tengan siempre dos dígitos
    const horasStr = horas.toString().padStart(2, '0');
    const minutosStr = minutos.toString().padStart(2, '0');

    // Formatear la hora en formato "hh:mm:ss"
    const horaStr = `${horasStr}:${minutosStr}`;
    return horaStr;
  }

}
