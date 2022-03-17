import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Account } from 'src/app/shared/models';
@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {
  @Input() currentInfo: Account;
  @Output() modeChange = new EventEmitter<boolean>();
  switchView(){
    this.modeChange.emit(false);
  }
  @Output() submit = new EventEmitter<Account>();
  
  update(){
    this.submit.emit(this.currentInfo);
  }
  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Account Edit | Zone Connect');
  }

}
