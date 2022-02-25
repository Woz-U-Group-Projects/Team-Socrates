import { Component, OnInit, } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Account } from '../../shared/models/account';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  initialized: Boolean = false;
  editMode: Boolean = false;
  private userAccount: Account;
  private apiRoute = 'http://localhost:3001/api/users/profile';
  constructor(private _ApiService: ApiService) { }

  
  ngOnInit() {
    this._ApiService.get(this.apiRoute).subscribe(
      (res: Account) => {this.userAccount = res},
      err => console.error(err),
      () => {console.log('Account page initialized!'); console.log(this.userAccount); this.initialized=true;}
    )
  }
  
  onSubmit(newInfo: Account) {
    this._ApiService.put(this.apiRoute, newInfo).subscribe(
      res => console.log(res),
      err => console.error(err),
      () => {this.editMode=false;}
    )
  }
}
