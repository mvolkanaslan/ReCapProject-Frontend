import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardNumber',
})
export class CreditCardNumberPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return value
      .replace(/\s+/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  }
}
