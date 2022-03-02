import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Account } from 'src/app/shared/models';
@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {
  @Input() currentInfo!: Account;
  userGender?: string;
  age?: number;
  birthday?: string;
  @Output() modeChange = new EventEmitter<boolean>();
  switchView(){
    this.modeChange.emit(true);
  }
  constructor() { }

  ngOnInit(): void {
    console.log('child initializing');
    console.log(this.currentInfo);
    //Make gender of User human readable, leaves blank if unspecified
    switch (this.currentInfo.gender) {
      case 'm':
        this.userGender = 'Male'
        break;
      case 'f':
        this.userGender = 'Female'
        break;
      case 'o':
        this.userGender = 'Other'
        break;
    }
    //Find age and birthday of User, leaves blank if unspecified
    if (this.currentInfo.dateOfBirth){
      const today = new Date();
      const mdiff = today.getMonth() - this.currentInfo.dateOfBirth.getMonth();
      this.age = (today.getFullYear() - this.currentInfo.dateOfBirth.getFullYear());
      if (mdiff < 1 || mdiff === 0 && today.getDate() < this.currentInfo.dateOfBirth.getDate()){
        this.age--;
      }
    this.birthday = `${this.currentInfo.dateOfBirth.getMonth() + 1}/${this.currentInfo.dateOfBirth.getDate()}`;
    }
  }

}
