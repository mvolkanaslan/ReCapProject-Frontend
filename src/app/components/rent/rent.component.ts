declare var $: any;
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarInfo } from 'src/app/models/carInfo';
import { CarService } from 'src/app/services/car.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { RentalService } from 'src/app/services/rental.service';
import { ResponseModel } from 'src/app/models/responseModel';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { CustomerDetails } from 'src/app/models/customerDetails';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
  carID: number;
  carDetails: CarInfo;
  _rentDate = new FormControl('');
  rentAddForm: FormGroup;
  IsRentable: ResponseModel = {
    isSuccess: true,
    message: '',
  };
  modelStatus: string = '';
  minRentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  minReturnDate: string;
  activeUser: CustomerDetails;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private router: Router,
    private datePipe: DatePipe,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.activeUser = JSON.parse(localStorage.getItem('User') || '{}');
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carID = parseInt(params['carId']);
        this.getActiveCarDetail(params['carId']);
      }
    });
    this.createRentAddForm();
  }
  getActiveCarDetail(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
      this.carDetails = response.data[0];
    });
  }
  createRentAddForm() {
    this.rentAddForm = this.formBuilder.group({
      carId: [this.carID, Validators.required],
      customerId: [this.activeUser.customerId, Validators.required], //Id si 1 olan customer in kullanici girisi yaptigi varsayiliyor
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }
  goToPayment() {
    if (this.rentAddForm.valid) {
      let rentToAdd = Object.assign({}, this.rentAddForm.value);
      this.rentalService.IsRentable(rentToAdd).subscribe(
        (response) => {
          this.IsRentable = response;
          $('#rentModel').modal('hide');
          this.router.navigate(['payment', JSON.stringify(rentToAdd)]);
        },
        (responseError) => {
          this.IsRentable = responseError.error;
          this.errorService.getError(responseError);
        }
      );
    } else {
      this.IsRentable = {
        isSuccess: false,
        message: 'Please Enter Required Areas !',
      };
    }
  }
}
