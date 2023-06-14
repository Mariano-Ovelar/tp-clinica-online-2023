import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private firestoreSrv: FirestoreService) {}

  async guardar(container: any) {
    this.firestoreSrv.guardar(container, 'productos');
  }
  async traer() {
    return this.firestoreSrv.traer('productos');
  }
  async modificar(container: any, containerModificado: any) {
    return this.firestoreSrv.modificar(
      container,
      containerModificado,
      'productos'
    );
  }
  async eliminar(container: any) {
    this.firestoreSrv.eliminar(container, 'productos');
  }
  actualizarLista(): Observable<any> {
    return new Observable((observer) => {
      this.traer().then((res) => {
        // Emite un valor
        observer.next(res);
        observer.complete();
      });
    });
  }
}
