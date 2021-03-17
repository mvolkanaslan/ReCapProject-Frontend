import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  currentColor: Color;
  allColor: Color;
  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getColor();
  }
  getColor() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  setCurrentColor(color: Color) {
    this.currentColor = color;
  }
  toggleClass(color: Color) {
    return color == this.currentColor
      ? 'list-group-item list-group-item-action list-group-item-primary'
      : 'list-group-item list-group-item-action';
  }
}
