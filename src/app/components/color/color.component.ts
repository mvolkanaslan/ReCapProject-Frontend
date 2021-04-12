import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
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
  colorId?: number;
  colorForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        Filters.colorId = Number(params['colorId']);
      } else {
        Filters.colorId = 0;
      }
      this.getColor();
      this.createColorForm(Filters.colorId);
    });
  }
  getColor() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.colors.unshift({ id: 0, colorName: 'SELECT A COLOR' });
    });
  }
  createColorForm(id: number) {
    this.colorForm = this.fb.group({
      id: new FormControl(id, Validators.required),
      colorName: new FormControl('', Validators.required),
    });
  }
  setCurrentColor() {
    Filters.colorId = this.colorForm.controls['id'].value;
  }
}
