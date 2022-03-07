import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { first } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: any = {username: '', password: ''};
  private apiRoute = 'users/login';
  onLogin(){
    this._ApiService.post(this.apiRoute, this.credentials).pipe(first()).subscribe({
      next: res => console.log(res),
      error: err => console.error(err),
      complete: () => console.log('logged in')
    })
  }
  constructor(private _ApiService: ApiService) { }

  ngOnInit(): void {
  }

}
