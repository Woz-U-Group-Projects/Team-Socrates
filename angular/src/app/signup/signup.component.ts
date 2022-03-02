import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  newUser: any = {username: '', password: '', email: ''};
  private apiRoute = 'users';
  userSubmit() {
    this._ApiService.post(this.apiRoute, this.newUser).subscribe(
      res => console.log(res),
      err => {console.error(err)},
      () => console.log('complete')
    )
  }
  constructor(private _ApiService: ApiService) { }

  ngOnInit(): void {
  }

}
