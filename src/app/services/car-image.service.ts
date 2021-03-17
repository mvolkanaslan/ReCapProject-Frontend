import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImages';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiURL = 'https://localhost:44375/api/carImages/GetByCarId?id=';
  constructor(private httpClient: HttpClient) {}
  getCarImages(carId: number): Observable<ListResponseModel<CarImage>> {
    let newURL = this.apiURL + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newURL);
  }
}
