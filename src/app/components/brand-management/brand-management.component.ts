declare var $: any;
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-brand-management',
  templateUrl: './brand-management.component.html',
  styleUrls: ['./brand-management.component.css'],
})
export class BrandManagementComponent implements OnInit {
  brands: Brand[];
  brandEditForm: FormGroup;
  icons = {
    faTrash: faTrash,
    faEdit: faEdit,
  };
  brandToDelete: Brand;
  constructor(
    private brandService: BrandService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.createBrandForm();
    this.getBrands();
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  setBrandToDelete(id: number) {
    this.brandToDelete = Object.assign({ id: id });
  }
  deleteBrand() {
    this.brandService.deleteBrand(this.brandToDelete).subscribe(
      (response) => {
        $('#brandDeleteModal').modal('hide');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['brandmanage']));
        this.toastrService.success(response.message);
      },
      (responseError) => {
        this.errorService.getError(responseError);
      }
    );
  }
  getUpdateModal(brand: Brand) {
    this.brandEditForm.setValue({
      id: brand.id,
      brandName: brand.brandName,
    });
  }
  updateBrand() {
    if (this.brandEditForm.valid) {
      this.brandEditForm.patchValue({
        id: Number(this.brandEditForm.controls['id'].value),
      });
      let brandToUpdate = Object.assign({}, this.brandEditForm.value);
      this.brandService.updateBrand(brandToUpdate).subscribe(
        (response) => {
          this.brandEditForm.reset();
          $('#brandUpdateModal').modal('hide');
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['brandmanage']));
          this.toastrService.success(response.message);
        },
        (responseError) => {
          this.errorService.getError(responseError);
        }
      );
    } else {
      this.toastrService.warning('Please Fill the Form !');
    }
  }
  addBrand() {
    if (this.brandEditForm.valid) {
      this.brandEditForm.removeControl('id');
      let brandToAdd = Object.assign({}, this.brandEditForm.value);
      this.brandService.addBrand(brandToAdd).subscribe(
        (response) => {
          this.brandEditForm.reset();
          $('#brandAddModal').modal('hide');
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['brandmanage']));
          this.toastrService.success(response.message);
        },
        (responseError) => {
          this.errorService.getError(responseError);
        }
      );
    } else {
      this.toastrService.warning('Please Fill the Form !');
    }
  }

  createBrandForm() {
    this.brandEditForm = this.fb.group({
      id: new FormControl(''),
      brandName: new FormControl('', Validators.required),
    });
  }
}
