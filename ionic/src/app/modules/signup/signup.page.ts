import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  private newUser: any = { username: '', password: '', email: ''}
  private apiRoute = 'http://localhost:3001/api/users'
  userSubmit() {
    this._ApiService.post(this.apiRoute, this.newUser).subscribe(
      res => console.log(res),
      err => {console.error(err)},
      () => console.log('complete')
    )
  }
  constructor(private _ApiService: ApiService) { }

  ngOnInit() {
  }

}
