import { Pipe, PipeTransform } from '@angular/core';
import { CarInfo } from '../models/carInfo';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(value: CarInfo[], filterText: string): CarInfo[] {
    filterText ? filterText.toLocaleLowerCase() : '';
    return value.filter(
      (carInfo) =>
        carInfo.brandName.toLocaleLowerCase().includes(filterText) ||
        carInfo.colorName.toLocaleLowerCase().includes(filterText) ||
        carInfo.carName.toLocaleLowerCase().includes(filterText)
    );
  }
}
