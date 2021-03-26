import { Pipe, PipeTransform } from '@angular/core';
import { CarInfo } from '../models/carInfo';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(value: CarInfo[], filterText: string): CarInfo[] {
    filterText ? (filterText = filterText.toLowerCase()) : '';
    return value.filter(
      (carInfo) =>
        carInfo.brandName.toLowerCase().includes(filterText) ||
        carInfo.colorName.toLowerCase().includes(filterText) ||
        carInfo.carName.toLowerCase().includes(filterText)
    );
  }
}
