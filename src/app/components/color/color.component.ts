import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { Filters } from 'src/app/models/filters';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  currentColor: Color;
  allColor?: Color;
  Filters = { brandId: '', colorId: '' };
  constructor(
    private colorService: ColorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getColor();
  }
  getColor() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  setCurrentColor() {
    this.currentColor !== undefined
      ? (Filters.colorId = this.currentColor.id.toString())
      : (Filters.colorId = '');
  }
  allColorsSelected() {
    return this.currentColor == undefined ? true : false;
  }

  // setCurrentColor() {
  //   this.currentColor != null
  //     ? this.router.navigate(['cars/'], {
  //         queryParams: { colorId: this.currentColor.id },
  //         queryParamsHandling: 'merge',
  //         relativeTo: this.route,
  //       })
  //     : this.router.navigate(['/cars']);
  // }
}
