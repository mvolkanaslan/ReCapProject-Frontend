import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  constructor(private httpClient: HttpClient) {}
  apiURL = 'https://localhost:44375/api/creditcard/';

  addCreditCard(creditCard: CreditCard): Observable<ResponseModel> {
    let newURL = `${this.apiURL}add`;
    return this.httpClient.post<ResponseModel>(newURL, creditCard);
  }
  deleteCreditCard(creditCard: CreditCard): Observable<ResponseModel> {
    let newURL = `${this.apiURL}delete`;
    return this.httpClient.post<ResponseModel>(newURL, creditCard);
  }
  getCreditCardByCustomerId(
    customerId: number
  ): Observable<ListResponseModel<CreditCard>> {
    let newURL = `${this.apiURL}GetByCustomerId?id=${customerId}`;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newURL);
  }
}
