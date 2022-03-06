import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {
  userGender: string;
  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'm':
        this.userGender = 'Male'
        break;
      case 'f':
        this.userGender = 'Female'
        break;
      case 'o':
        this.userGender = 'Other'
        break;
      default:
        this.userGender = 'Unspecified'
        break;
    }
    return this.userGender;
  }

}
