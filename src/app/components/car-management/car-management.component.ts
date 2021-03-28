declare var $: any;
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CarInfo } from 'src/app/models/carInfo';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { Car } from 'src/app/models/car';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-car-management',
  templateUrl: './car-management.component.html',
  styleUrls: ['./car-management.component.css'],
})
export class CarManagementComponent implements OnInit {
  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private colorService: ColorService,
    private router: Router,
    private toastrService: ToastrService
  ) {}
  carIdToDelete: Car;
  faTrash = faTrash;
  faEdit = faEdit;
  carToEdit: Car;
  cars: CarInfo[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  carEditForm: FormGroup;

  ngOnInit(): void {
    this.createCarEditForm();
    this.getCars();
    this.getColors();
    this.getBrands();
  }

  getCars() {
    this.carService.getCarsDetails().subscribe((response) => {
      this.cars = response.data;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  setCarToDelete(carId: number) {
    this.carIdToDelete = Object.assign({ id: carId });
  }
  deleteCar() {
    this.carService.carDelete(this.carIdToDelete).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['carmanage']));
      },
      (responseError) => {
        this.toastrService.error(responseError);
        console.log(responseError);
      }
    );
  }
  createCarEditForm() {
    this.carEditForm = this.formBuilder.group({
      id: new FormControl(''),
      brandId: new FormControl(Validators.required),
      colorId: new FormControl(Validators.required),
      modelYear: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      dailyPrice: new FormControl('', Validators.required),
    });
  }
  getUpdateModel(car: CarInfo) {
    this.carEditForm.setValue({
      id: car.carId,
      colorId: car.colorId,
      brandId: car.brandId,
      modelYear: car.modelYear,
      description: car.carName,
      dailyPrice: car.dailyPrice,
    });
  }
  updateCar() {
    if (this.carEditForm.valid) {
      this.carToEdit = Object.assign({}, this.carEditForm.value);
      this.convertStrToInt(this.carToEdit);
      console.log(this.carToEdit);

      this.carService.carUpdate(this.carToEdit).subscribe((response) => {
        this.carEditForm.reset();
        $('#carUpdateModal').modal('hide');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['carmanage']));
        this.toastrService.success(response.message);
      });
    } else {
      this.toastrService.warning('Please fill the Form !');
    }
  }
  addCar() {
    if (this.carEditForm.valid) {
      this.carEditForm.removeControl('id');
      this.carToEdit = Object.assign({}, this.carEditForm.value);
      this.convertStrToInt(this.carToEdit);
      console.log(this.carToEdit);
      this.carService.carAdd(this.carToEdit).subscribe((response) => {
        this.carEditForm.reset();
        $('#carAddModal').modal('hide');

        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['carmanage']));
        this.toastrService.success(response.message);
      });
    } else {
      this.toastrService.warning('Please Fill the Form !');
    }
  }
  convertStrToInt(carToEdit: Car) {
    carToEdit.brandId = parseInt(this.carEditForm.controls['brandId'].value);
    carToEdit.colorId = parseInt(this.carEditForm.controls['colorId'].value);
    return carToEdit;
  }
}
