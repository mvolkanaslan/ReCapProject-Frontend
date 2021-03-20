import { Component, OnInit } from '@angular/core';
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
  currentBrand: Brand;
  allBrand?: Brand;
  Filters = {};
  constructor(
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  setCurrentBrand() {
    this.currentBrand !== undefined
      ? (Filters.brandId = this.currentBrand.id.toString())
      : (Filters.brandId = '');
  }
  allBrandSelected() {
    return this.currentBrand == undefined ? true : false;
  }
  // setCurrentBrand() {
  //   this.currentBrand != null
  //     ? this.router.navigate(['cars/'], {
  //         queryParams: { brandId: this.currentBrand.id },
  //         queryParamsHandling: 'merge',
  //         relativeTo: this.route,
  //       })
  //     : this.router.navigate(['/cars']);
  // }
}
