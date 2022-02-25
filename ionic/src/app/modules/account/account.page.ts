import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Account } from '../../shared/models/account';
import { AccountEditComponent } from './account-edit/account-edit.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  editMode: Boolean = false;
  private userAccount: Account = {
    firstName: '',
    lastName: '',
    gender: '',
    location: '',
    email: '',
    areaOfStudy: '',
    bio: '',
    
    dateOfBirth: null
  };
  private apiRoute = 'http://localhost:3001/api/users/profile';
  constructor(private _ApiService: ApiService) { }

  ngOnInit() {
    this._ApiService.get(this.apiRoute).subscribe(
      res => {},
      err => console.error(err),
      () => {console.log('Account page initialized')}
    )
  }
  changeView() {
    if (!this.editMode){
      this.editMode = true;
      console.log('edit mode');
    } else {
      this.editMode = false;
      console.log('view mode');
    }
  }

}
