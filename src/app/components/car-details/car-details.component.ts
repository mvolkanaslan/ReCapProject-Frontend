import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarInfo } from 'src/app/models/carInfo';
import { CarImage } from 'src/app/models/carImages';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/services/storage.service';
import { Customer } from 'src/app/models/customer';
import { CustomerDetails } from 'src/app/models/customerDetails';
import { RentalService } from 'src/app/services/rental.service';
import { Rental } from 'src/app/models/rental';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  carDetails: CarInfo;
  carImages: CarImage[];
  BaseUrl = environment.apiBaseUrl;
  activeUser: CustomerDetails;
  isFindexEnough: boolean;
  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.storageService.getActiveUser() != undefined
      ? (this.activeUser = this.storageService.getActiveUser())
      : (this.activeUser = Object.assign({ customerId: 0 }));

    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetails(Number(params['carId']));
        this.findexScoreCheck(
          this.activeUser.customerId,
          Number(params['carId'])
        );
      }
    });
  }
  getCarDetails(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
      this.carDetails = response.data[0];
    });
    this.carImageService.getCarImages(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
  findexScoreCheck(customerId: number, carId: number) {
    if (customerId) {
      this.rentalService
        .checkFindexScore(customerId, carId)
        .subscribe((response) => {
          this.isFindexEnough = response.isSuccess;
        });
    } else {
      this.isFindexEnough = true;
    }
  }
  // getButton(carImages: CarImage[]) {
  //   for (let i = 0; i < carImages.length; i++) {
  //     document
  //       .getElementById('btn-carousel')
  //       ?.insertAdjacentHTML(
  //         'beforeend',
  //         `<button  type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" ${
  //           i == 0 ? 'class="active"' : null
  //         } aria-current="true" aria-label="Slide 1" ></button>`
  //       );
  //   }
  // }
}
