import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: any = {username: '', password: ''};
  private apiRoute = 'users/login';
  onLogin(){
    this._ApiService.post(this.apiRoute, this.credentials).subscribe(
      res => console.log(res),
      err => console.error(err),
      () => console.log('logged in')
    )
  }
  constructor(private _ApiService: ApiService) { }

  ngOnInit(): void {
  }

}
