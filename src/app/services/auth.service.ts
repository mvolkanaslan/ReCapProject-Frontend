import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetails } from '../models/customerDetails';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/SingleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

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
  updateUser(user: CustomerDetails): Observable<ResponseModel> {
    let newURL = this.apiURL + 'UserUpdate';
    return this.httpClient.post<ResponseModel>(newURL, user);
  }
  updateUserPassword(userPassword: any): Observable<ResponseModel> {
    let newURL = this.apiURL + 'changepassword';
    return this.httpClient.post<ResponseModel>(newURL, userPassword);
  }
}
