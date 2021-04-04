import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarInfo } from 'src/app/models/carInfo';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  cars: CarInfo[] = [];
  baseURL = environment.apiBaseUrl;
  cardefaultImgPath = environment.cardefaultImgPath;
  filterText: string = '';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId'])
        this.getCarByBrandAndColor(params['brandId'], params['colorId']);
      else if (params['brandId']) this.getCarsByBrand(params['brandId']);
      else if (params['colorId']) this.getCarsByColor(params['colorId']);
      else this.getCars();
    });
  }
  getCars() {
    this.carService.getCarsDetails().subscribe((response) => {
      this.cars = response.data;
    });
  }
  getCarsByBrand(brandId: number) {
    this.carService.getCarsDetailsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsDetailsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
    });
  }
  getCarByBrandAndColor(brandId: number, colorId: number) {
    this.carService
      .getCarsDetailsByBrandAndColor(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
      });
  }
}
