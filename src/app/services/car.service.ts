import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarResponseModel } from '../models/CarResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiURL = 'https://localhost:44375/api/cars/cardetails';
  constructor(private httpClient: HttpClient) {}
  getCars(): Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(this.apiURL);
  }
}
