import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiURL = 'https://localhost:44375/api/rentals/rentaldetails';
  constructor(private httpCLient: HttpClient) {}
  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpCLient.get<ListResponseModel<Rental>>(this.apiURL);
  }
}
