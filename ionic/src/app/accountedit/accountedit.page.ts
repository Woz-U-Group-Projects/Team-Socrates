import { Component, OnInit } from '@angular/core';
import { Account } from '../models/account';

@Component({
  selector: 'app-accountedit',
  templateUrl: './accountedit.page.html',
  styleUrls: ['./accountedit.page.scss'],
})
export class AccounteditPage implements OnInit {
  model: Account = new Account();
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("the form was submitted successfully", this.model)
  }

}


