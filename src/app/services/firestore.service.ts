import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import {
  ref,
  FirebaseStorage,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { Observable } from 'rxjs';
import { Storage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore, private storage: Storage) {}

  async guardar(obj: any, coleccion: string) {
    const col = collection(this.firestore, coleccion);
    // Guardar el objeto con un ID automático
    const docRef = await addDoc(col, obj);
    const id = docRef.id;

    // Actualizar el campo 'id' del objeto guardado
    const actorDocRef = doc(col, docRef.id);
    await setDoc(actorDocRef, { ...obj, id }).then(() => {});
  }
  async traer(coleccion: string) {
    const col = collection(this.firestore, coleccion);
    const Snapshot = await getDocs(col);
    const list = Snapshot.docs.map((doc) => doc.data());
    localStorage.setItem(coleccion, JSON.stringify(list));
    return list;
  }

  async modificar(obj: any, objModificado: any, coleccion: string) {
    const col = collection(this.firestore, coleccion);
    const docRef = doc(col, obj.id); // Suponiendo que 'obj' tiene una propiedad 'id'

    // Actualizar el documento con los datos del contenedor modificado
    setDoc(docRef, objModificado, { merge: true });
  }
  async eliminar(obj: any, coleccion: string) {
    this.modificar(obj, { docActivo: false }, coleccion);
  }
  async guardarImagen(imgFile: any, nombreImg: string) {
    const imgRef = ref(this.storage, `img/${nombreImg}`);
    return await uploadBytes(imgRef, imgFile)
      .then(async () => await getDownloadURL(imgRef).then((res) => res))
      .catch((err) => {
        console.log(err);
        return '';
      });
  }
}
