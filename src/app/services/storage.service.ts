import { Injectable } from '@angular/core';
import { CustomerDetails } from '../models/customerDetails';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  //USER STORAGE------------------------
  setActiveUser(value: string) {
    localStorage.setItem('User', value);
  }
  getActiveUser(): CustomerDetails {
    return JSON.parse(localStorage.getItem('User') || '{}');
  }
  deleteActiveUser() {
    localStorage.removeItem('User');
  }
  //-------------------------------------

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  deleteItem(key: string) {
    localStorage.removeItem(key);
  }
}
