import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { first } from 'rxjs';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  initialized: Boolean = false;
  editMode: Boolean = false;
  userAccount!: any;
  private apiRoute = 'users/profile';
  constructor(private _ApiService: ApiService) { }

  ngOnInit(): void {
    this._ApiService.get(this.apiRoute).pipe(first()).subscribe({
      next: (res: any) => {this.userAccount = res},
      complete: () => {this.initialized=true;},
      error: err => {console.error(err)}
    })
  }
  onSubmit(newInfo: any) {
    this._ApiService.put(this.apiRoute, newInfo).pipe(first()).subscribe({
      error: err => console.error(err),
      complete: () => {this.editMode=false;}
    }
     
    )
  }
}
