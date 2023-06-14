import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  /* === Localstorage === */
  //SET

  setElementLocalstorage(key: string, element: any) {
    localStorage.setItem(key, JSON.stringify(element));
  }
  //GET

  getElementLocalstorage(key: string) {
    const lS = localStorage.getItem(key);
    if (lS) return JSON.parse(lS);
  }
}
