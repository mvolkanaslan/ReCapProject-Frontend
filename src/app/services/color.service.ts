import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiURL = 'https://localhost:44375/api/colors/';
  constructor(private httpClient: HttpClient) {}
  getColors(): Observable<ListResponseModel<Color>> {
    let newURL = this.apiURL + 'getall';
    return this.httpClient.get<ListResponseModel<Color>>(newURL);
  }
  deleteColor(color: Color): Observable<ResponseModel> {
    let newURL = this.apiURL + 'delete';
    return this.httpClient.post<ResponseModel>(newURL, color);
  }
  updateColor(color: Color): Observable<ResponseModel> {
    let newURL = this.apiURL + 'update';
    return this.httpClient.post<ResponseModel>(newURL, color);
  }
  addColor(color: Color): Observable<ResponseModel> {
    let newURL = this.apiURL + 'add';
    return this.httpClient.post<ResponseModel>(newURL, color);
  }
}
