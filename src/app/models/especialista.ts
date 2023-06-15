import { User } from './user';
export enum tipoEspecialista {
  cardiología = 'cardiología',
  dermatología = 'dermatología',
  pediatría = 'pediatría',
  ortopedia = 'ortopedia',
  neurología = 'neurología',
  otorrinolaringología = 'otorrinolaringología',
}
export class Especialista extends User {
  especialidades: tipoEspecialista[] =
    []; /* (agregar alguna que no se encuentre entre las posibilidades) */
  constructor(
    uid: string,
    name: string,
    email: string,
    lastName: string,
    dni: number,
    edad: number,
    especialidades: tipoEspecialista[],
    imagenePerfil: string,
    tipoUser: string
  ) {
    super(uid, name, lastName, email, edad, dni, tipoUser, imagenePerfil);
    this.especialidades = especialidades;
  }
}
