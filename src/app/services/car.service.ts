import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarInfo } from '../models/carInfo';
import { EntityResponseModel } from '../models/entityResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiURL = 'https://localhost:44375/api/cars/';
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<CarInfo>> {
    let newPath = this.apiURL + 'cardetails';
    return this.httpClient.get<ListResponseModel<CarInfo>>(newPath);
  }
  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarInfo>> {
    let newPath = this.apiURL + 'CarDetailsByBrandId?id=' + brandId;
    return this.httpClient.get<ListResponseModel<CarInfo>>(newPath);
  }
  getCarsByColor(colorId: number): Observable<ListResponseModel<CarInfo>> {
    let newPath = this.apiURL + 'CarDetailsByColorId?id=' + colorId;
    return this.httpClient.get<ListResponseModel<CarInfo>>(newPath);
  }

  getCarById(carId: number): Observable<ListResponseModel<CarInfo>> {
    let newPath = this.apiURL + 'CarDetailsByCarId?id=' + carId;
    return this.httpClient.get<ListResponseModel<CarInfo>>(newPath);
  }
  getCarByBrandAndColor(
    brandId: number,
    colorId: number
  ): Observable<ListResponseModel<CarInfo>> {
    let newPath =
      this.apiURL +
      'CarsByBrandAndColor?brandId=' +
      brandId +
      '&colorId=' +
      colorId;
    return this.httpClient.get<ListResponseModel<CarInfo>>(newPath);
  }
}
