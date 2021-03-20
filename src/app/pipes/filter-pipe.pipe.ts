import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(value: Car[], filterText: string): Car[] {
    filterText ? filterText.toLocaleLowerCase() : '';
    return value.filter(
      (car) =>
        car.brandName.toLocaleLowerCase().includes(filterText) ||
        car.colorName.toLocaleLowerCase().includes(filterText) ||
        car.carName.toLocaleLowerCase().includes(filterText)
    );
  }
}
