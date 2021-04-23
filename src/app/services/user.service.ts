import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/SingleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURl = 'https://localhost:44375/api/users/';

  constructor(private httpClient: HttpClient) {}
  getUserById(id: number): Observable<SingleResponseModel<User>> {
    let newURL = this.apiURl + '/GetById?id=' + id;
    return this.httpClient.get<SingleResponseModel<User>>(newURL);
  }
}
