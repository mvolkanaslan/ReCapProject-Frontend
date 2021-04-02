import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiURL = 'https://localhost:44375/api/brands/';
  constructor(private httpClient: HttpClient) {}
  getBrands(): Observable<ListResponseModel<Brand>> {
    let newURL = this.apiURL + 'getall';
    return this.httpClient.get<ListResponseModel<Brand>>(newURL);
  }
  updateBrand(brand: Brand): Observable<ResponseModel> {
    let newURL = this.apiURL + 'update';
    return this.httpClient.post<ResponseModel>(newURL, brand);
  }
  addBrand(brand: Brand): Observable<ResponseModel> {
    let newURL = this.apiURL + 'add';
    return this.httpClient.post<ResponseModel>(newURL, brand);
  }
  deleteBrand(brand: Brand): Observable<ResponseModel> {
    let newURL = this.apiURL + 'delete';
    return this.httpClient.post<ResponseModel>(newURL, brand);
  }
}
