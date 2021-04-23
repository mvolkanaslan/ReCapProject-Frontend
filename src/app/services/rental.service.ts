import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetails } from '../models/rentalDetails';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiURL = 'https://localhost:44375/api/rentals/';
  constructor(private httpCLient: HttpClient) {}
  getRentals(): Observable<ListResponseModel<RentalDetails>> {
    let newURL = this.apiURL + 'rentaldetails';
    return this.httpCLient.get<ListResponseModel<RentalDetails>>(newURL);
  }
  addRental(rental: Rental): Observable<ListResponseModel<RentalDetails>> {
    let newURL = this.apiURL + 'add';
    return this.httpCLient.post<ListResponseModel<RentalDetails>>(
      newURL,
      rental
    );
  }
  IsRentable(rental: Rental): Observable<ResponseModel> {
    let newURL = this.apiURL + 'isrentable';
    return this.httpCLient.post<ResponseModel>(newURL, rental);
  }
  checkFindexScore(
    customerId: number,
    carId: number
  ): Observable<ResponseModel> {
    let newURL =
      this.apiURL + `checkfindex?customerId=${customerId}&carId=${carId}`;
    return this.httpCLient.get<ResponseModel>(newURL);
  }
  getRentalsByCustomerId(
    customerId: number
  ): Observable<ListResponseModel<RentalDetails>> {
    let newUrl = this.apiURL + 'RentalDetailsByCustomerId?id=' + customerId;
    return this.httpCLient.get<ListResponseModel<RentalDetails>>(newUrl);
  }
}
