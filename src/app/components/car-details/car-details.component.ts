import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImages';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  carDetails: Car;
  carImages: CarImage[];
  BaseUrl = environment.apiBaseUrl;

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) this.getCarDetails(params['carId']);
    });
  }
  getCarDetails(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.carDetails = response.data[0];
    });
    this.carImageService.getCarImages(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
}
