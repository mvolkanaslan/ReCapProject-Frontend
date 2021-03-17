import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiURL = 'https://localhost:44375/api/cars/';
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiURL + 'cardetails';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiURL + 'CarDetailsByBrandId?id=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiURL + 'CarDetailsByColorId?id=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  //CarDetailsByCarId
  getCarById(carId: number): Observable<Car> {
    let newPath = this.apiURL + 'CarDetailsByCarId?id=' + carId;
    return this.httpClient.get<Car>(newPath);
  }
}
