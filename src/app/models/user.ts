export interface IUser {
  uid: string;
  name: string;
  lastName: string;
  edad: number;
  email: string;
  password?: string;
  dni: number;
}

export class User implements IUser {
  uid: string;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  edad: number;
  dni: number;
  tipoUser: string;
  constructor(
    uid: string,
    name: string,
    lastName: string,
    email: string,
    edad: number,
    dni: number,
    tipoUser: string
  ) {
    this.uid = uid;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.edad = edad;
    this.dni = dni;
    this.tipoUser = tipoUser;
  }
  public static GetLoggedUser(listaUser: any[], user: any) {
    const userEncontrado: User = listaUser.find(
      (item: any) => item.uid === user.user.uid
    );
    return userEncontrado;
  }
}
