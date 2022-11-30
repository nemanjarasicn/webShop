import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getStorage(name: string): any{
    return JSON.parse(localStorage[name] || '[]');
  }

  setStorage(name: string, value: any): void{
    localStorage[name] = JSON.stringify(value);
  }
}
