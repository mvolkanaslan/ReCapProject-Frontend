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
  apiURL = 'https://localhost:44375/api/';
  constructor(private httpCLient: HttpClient) {}
  getRentals(): Observable<ListResponseModel<RentalDetails>> {
    let newURL = this.apiURL + 'rentals/rentaldetails';
    return this.httpCLient.get<ListResponseModel<RentalDetails>>(newURL);
  }
  addRental(rental: Rental): Observable<ListResponseModel<RentalDetails>> {
    let newURL = this.apiURL + 'rentals/add';
    return this.httpCLient.post<ListResponseModel<RentalDetails>>(
      newURL,
      rental
    );
  }
  IsRentable(rental: Rental): Observable<ResponseModel> {
    let newURL = this.apiURL + 'rentals/isrentable';
    return this.httpCLient.post<ResponseModel>(newURL, rental);
  }
}
