import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiURl = 'https://localhost:44375/api';
  constructor(private httpClient: HttpClient) {}

  payment(payment: Payment): Observable<ResponseModel> {
    let newURL = this.apiURl + '/payment/payment';
    return this.httpClient.post<ResponseModel>(newURL, payment);
  }
}
