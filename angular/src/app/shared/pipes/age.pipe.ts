import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  newValue: number;
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value === null) {return null};
    const today = new Date();
    let date: any;
    if (typeof value === 'string'){
      date = new Date(value);
    } else {
      date = value;
    }
    const mdiff = today.getMonth() - date.getMonth();
    this.newValue = (today.getFullYear() - date.getFullYear());
    if (mdiff < 1 || mdiff === 0 && today.getDate() < date.getDate()){
      this.newValue--;
    }
    return this.newValue;
  }

}
