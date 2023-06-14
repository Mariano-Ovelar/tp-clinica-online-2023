import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { User } from '../models/user';
import { Fecha } from '../models/fecha';
import { Especialista } from '../models/especialista';
import { sendEmailVerification } from 'firebase/auth';
import { Alert } from '../models/alert';
import {
  ref,
  FirebaseStorage,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuario: any = null;
  estaLogeado: boolean = false;
  coleccion: string = 'usuarios';
  userLS: string = 'usuario';
  constructor(
    private auth: Auth,
    private lStorageSrv: LocalStorageService,
    private firestoreSrv: FirestoreService,
    private storage: Storage
  ) {
    this.actualizarEstadoUsuario().subscribe((res) => {
      this.usuario = res;
      if (this.usuario) {
        this.estaLogeado = true;
      } else {
        this.logout();
      }
    });
  }
  async registro(user: any) {
    return await createUserWithEmailAndPassword(
      this.auth,
      user.email,
      user.password
    ).then(async (res) => {
      await this.upDateUser({
        displayName: user.name,
      });
      console.log(res.user);
      sendEmailVerification(res.user);
      return res;
    });
  }
  login(user: any) {
    let mensajeError = 'Revise si el correo y la contraseña estan bien!!!!';
    return signInWithEmailAndPassword(this.auth, user.email, user.password)
      .then(async (res) => {
        if (res.user.emailVerified) {
          const usuario: any = User.GetLoggedUser(await this.traer(), res);
          if (!usuario.emailVerificado) {
            mensajeError = 'El administrador no aprobó su cuenta!!!!';
            throw new Error();
          }
          this.lStorageSrv.setElementLocalstorage(this.userLS, usuario);
          this.usuario = usuario;
          return usuario;
        } else {
          mensajeError = 'El correo no está verificado!!!!';
          throw new Error();
        }
      })
      .catch(() => {
        throw new Error(mensajeError);
      });
  }
  logout() {
    return signOut(this.auth).then(() => {
      this.lStorageSrv.setElementLocalstorage(this.userLS, null);
      this.usuario = null;
    });
  }
  async upDateUser(user: any) {
    const auth = getAuth();
    const theUser = auth.currentUser;
    if (theUser) return updateProfile(theUser, user);
  }
  actualizarEstadoUsuario(): Observable<any> {
    return new Observable((observer) => {
      this.usuario = this.lStorageSrv.getElementLocalstorage(this.userLS);
      // Emite un valor
      observer.next(this.usuario);
      observer.complete();
    });
  }

  async guardar(usuario: any, img1: any, img2?: any) {
    if (img2) {
      const imgRef = ref(this.storage, `img/${usuario.email}`);
      await uploadBytes(imgRef, img1)
        .then(() => {
          getDownloadURL(imgRef).then(async (res) => {
            usuario.imagenPerfil = res;
            const imgRef2 = ref(this.storage, `img/${usuario.email}2`);
            await uploadBytes(imgRef2, img2)
              .then(() => {
                getDownloadURL(imgRef2).then(async (res) => {
                  usuario.imagenPerfil2 = res;
                  this.firestoreSrv.guardar(usuario, this.coleccion);
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const imgRef = ref(this.storage, `img/${usuario.email}`);
      await uploadBytes(imgRef, img1)
        .then(() => {
          getDownloadURL(imgRef).then(async (res) => {
            usuario.imagenPerfil = res;
            this.firestoreSrv.guardar(usuario, this.coleccion);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  async traer(): Promise<any[]> {
    return this.firestoreSrv.traer(this.coleccion);
  }
  /*   registrarLog() {
    const fechaIngreso = Fecha.getFechaActual();
    const horaIngreso = Fecha.getHoraActual();
    this.firestoreSrv.guardar(
      {
        usuario: this.usuario,
        fechaIngreso: fechaIngreso,
        horaIngreso: horaIngreso,
      },
      'Log'
    );
  } */
}
