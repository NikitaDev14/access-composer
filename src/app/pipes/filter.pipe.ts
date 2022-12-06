import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform<T, U extends keyof T>(
    value: T[],
    fieldName: U,
    fieldValue: T[U],
  ): T[] {
    return value.filter((valueItem: T) => {
      return valueItem[fieldName] === fieldValue;
    });
  }
}
