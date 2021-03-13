import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalResponseModel } from '../models/rentalResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiURL = 'https://localhost:44375/api/rentals/rentaldetails';
  constructor(private httpCLient: HttpClient) {}
  getRentals(): Observable<RentalResponseModel> {
    return this.httpCLient.get<RentalResponseModel>(this.apiURL);
  }
}
