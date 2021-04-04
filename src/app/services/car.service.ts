import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { CarInfo } from '../models/carInfo';
import { SingleResponseModel } from '../models/SingleResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiURL = 'https://localhost:44375/api/cars/';
  constructor(private httpClient: HttpClient) {}

  getCarsDetails(): Observable<ListResponseModel<CarInfo>> {
    let newPath = this.apiURL + 'cardetails';
    return this.httpClient.get<ListResponseModel<CarInfo>>(newPath);
  }
  getCarsDetailsByBrand(
    brandId: number
  ): Observable<ListResponseModel<CarInfo>> {
    let newPath = this.apiURL + 'CarDetailsByBrandId?id=' + brandId;
    return this.httpClient.get<ListResponseModel<CarInfo>>(newPath);
  }
  getCarsDetailsByColor(
    colorId: number
  ): Observable<ListResponseModel<CarInfo>> {
    let newPath = this.apiURL + 'CarDetailsByColorId?id=' + colorId;
    return this.httpClient.get<ListResponseModel<CarInfo>>(newPath);
  }

  getCarDetailsById(carId: number): Observable<ListResponseModel<CarInfo>> {
    let newPath = this.apiURL + 'CarDetailsByCarId?id=' + carId;
    return this.httpClient.get<ListResponseModel<CarInfo>>(newPath);
  }
  getCarsDetailsByBrandAndColor(
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
  carUpdate(car: Car): Observable<ResponseModel> {
    let newURL = this.apiURL + 'update';
    return this.httpClient.post<ResponseModel>(newURL, car);
  }
  carDelete(car: Car): Observable<ResponseModel> {
    let newURL = this.apiURL + 'delete';
    return this.httpClient.post<ResponseModel>(newURL, car);
  }
  carAdd(car: Car): Observable<ResponseModel> {
    let newURL = this.apiURL + 'add';
    return this.httpClient.post<ResponseModel>(newURL, car);
  }
}
