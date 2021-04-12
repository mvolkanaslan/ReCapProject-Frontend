import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Filters } from 'src/app/models/filters';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  brandId?: number;
  brandForm: FormGroup;
  constructor(
    private brandService: BrandService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        Filters.brandId = Number(params['brandId']);
      } else {
        Filters.brandId = 0;
      }
      this.getBrands();
      this.createBrandForm(Filters.brandId);
    });
  }

  createBrandForm(id: number) {
    this.brandForm = this.fb.group({
      id: new FormControl(id, Validators.required),
      brandName: new FormControl('', Validators.required),
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.brands.unshift({ id: 0, brandName: 'SELECT A CAR' });
    });
  }
  setCurrentBrand() {
    Filters.brandId = this.brandForm.controls['id'].value;
  }
}
