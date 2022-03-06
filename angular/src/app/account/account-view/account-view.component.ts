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
  @Output() modeChange = new EventEmitter<boolean>();
  switchView(){
    this.modeChange.emit(true);
  }
  constructor() { }

  ngOnInit(): void {
    console.log('child initializing');
    console.log(this.currentInfo);
  }

}
