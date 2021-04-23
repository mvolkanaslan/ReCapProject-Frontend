import { Injectable } from '@angular/core';
import { CustomerDetails } from '../models/customerDetails';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  //Token Storage
  setToken(value: string) {
    localStorage.setItem('token', value);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  //-----------------------------------

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

  deleteItem(key: string) {
    localStorage.removeItem(key);
  }
}
