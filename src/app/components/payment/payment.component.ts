import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rental } from 'src/app/models/rental';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CreditCardNumberPipe } from 'src/app/pipes/credit-card-number.pipe';
import { CarDetails } from 'src/app/models/carDetails';
import { CarService } from 'src/app/services/car.service';
import { CarInfo } from 'src/app/models/carInfo';
import { PaymentService } from 'src/app/services/payment.service';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/services/rental.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CreditCard } from 'src/app/models/creditCard';
import { CustomerDetails } from 'src/app/models/customerDetails';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private carService: CarService,
    private paymentService: PaymentService,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private creditCardService: CreditCardService,
    private storageService: StorageService,
    private router: Router
  ) {}

  rental: Rental;
  carToRent: CarInfo;
  totalDay: number;
  totalPrice: number;
  customerCreditCards: CreditCard[];
  paymentForm: FormGroup;
  activeUser: CustomerDetails;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.rental = JSON.parse(params['rental']);
      this.getActiveUser();
      this.getCustomerCreditCards(this.activeUser.customerId);
      this.createPaymentForm();
      this.getCarDetails(this.rental.carId);
    });
  }
  getActiveUser() {
    this.activeUser = this.storageService.getActiveUser();
  }
  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      id: new FormControl(''),
      saveCardStatus: new FormControl(''),
      customerId: new FormControl(this.activeUser.customerId),
      holderName: new FormControl('', Validators.required),
      cardNumber: new FormControl('', Validators.required),
      mounthOfExp: new FormControl('', Validators.required),
      yearOfExp: new FormControl('', Validators.required),
      cvv: new FormControl('', Validators.required),
    });
  }
  getCarDetails(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
      this.carToRent = response.data[0];
      this.getTotalPrice();
    });
  }
  getTotalPrice() {
    let rentDate = new Date(this.rental.rentDate);
    let returnDate = new Date(this.rental.returnDate);
    this.totalDay =
      (returnDate.getTime() - rentDate.getTime()) / (24 * 3600 * 1000);
    this.totalPrice = this.totalDay * this.carToRent.dailyPrice;
  }
  getCustomerCreditCards(customerId: number) {
    this.creditCardService
      .getCreditCardByCustomerId(customerId)
      .subscribe((response) => {
        this.customerCreditCards = response.data;
      });
  }
  selectCreditCard(creditCard: CreditCard) {
    this.paymentForm.setValue(
      Object.assign({ ...creditCard, saveCardStatus: false })
    );
  }
  Payment() {
    if (this.paymentForm.valid) {
      let payment = Object.assign(
        { amount: this.totalPrice },
        this.paymentForm.value
      );
      this.paymentService.payment(payment).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.rentalAdd();
          this.saveCustomerCreditCard();
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      this.toastrService.warning('Please Fill the Required Areas !');
    }
  }
  rentalAdd() {
    this.rental.customerId = this.activeUser.customerId;
    this.rentalService.addRental(this.rental).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }
  saveCustomerCreditCard() {
    if (this.paymentForm.value['saveCardStatus']) {
      this.paymentForm.removeControl('id');
      let creditCard = this.paymentForm.value;
      this.creditCardService.addCreditCard(creditCard).subscribe((response) => {
        this.toastrService.success(response.message);
      });
    }
  }
}
