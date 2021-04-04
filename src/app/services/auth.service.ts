import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/SingleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  apiURL = 'https://localhost:44375/api/auth/';

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      this.apiURL + 'login',
      loginModel
    );
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) return true;
    else return false;
  }
  register(
    registerModel: RegisterModel
  ): Observable<SingleResponseModel<RegisterModel>> {
    return this.httpClient.post<SingleResponseModel<RegisterModel>>(
      this.apiURL + 'register',
      registerModel
    );
  }
}
