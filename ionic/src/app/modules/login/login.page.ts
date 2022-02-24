import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private credentials: any = {username: '', password: ''}
  private apiRoute = 'http://localhost:3001/api/users/login'
  onLogin(){
    this._ApiService.post(this.apiRoute, this.credentials).subscribe(
      res => console.log(res),
      err => console.error(err),
      () => console.log('logged in')
    )
  }
  constructor(private _ApiService: ApiService) { }

  ngOnInit() {
  }

}
