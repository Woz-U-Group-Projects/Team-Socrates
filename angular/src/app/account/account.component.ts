import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  initialized: Boolean = false;
  editMode: any = false;
  userAccount!: any;
  private apiRoute = 'users/profile';
  constructor(private _ApiService: ApiService) { }

  ngOnInit(): void {
    this._ApiService.get(this.apiRoute).subscribe(
      (res: any) => {this.userAccount = res},
      err => console.error(err),
      () => {console.log('Account page initialized!'); console.log(this.userAccount); this.initialized=true;}
    )
  }
  onSubmit(newInfo: any) {
    this._ApiService.put(this.apiRoute, newInfo).subscribe(
      res => console.log(res),
      err => console.error(err),
      () => {this.editMode=false;}
    )
  }
}
