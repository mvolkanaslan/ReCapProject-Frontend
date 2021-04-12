import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetails } from '../models/customerDetails';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiURL = 'https://localhost:44375/api/customers/';
  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<CustomerDetails>> {
    let newURL = this.apiURL + 'customerdetails';
    return this.httpClient.get<ListResponseModel<CustomerDetails>>(newURL);
  }
  getCustomerDetailsByEmail(
    email: string
  ): Observable<ListResponseModel<CustomerDetails>> {
    let newURL = this.apiURL + 'customerDetailsByEmail?email=' + email;
    return this.httpClient.get<ListResponseModel<CustomerDetails>>(newURL);
  }
}
