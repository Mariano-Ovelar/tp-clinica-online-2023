
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Mensaje } from '../models/mensaje';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  messagesRef = collection(this.firestore, 'messages');
  constructor(private firestore: Firestore) {}

  getMessages(): Observable<Mensaje[]> {
    return collectionData(this.messagesRef, { idField: 'id' }) as Observable<
    Mensaje[]
    >;
  }
  addMessage(message: Mensaje) {
    return addDoc(this.messagesRef, message);
  }
}