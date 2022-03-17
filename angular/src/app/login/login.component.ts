import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { Title } from '@angular/platform-browser';
import { SessionManagerService } from '../core/services/session-manager.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials: any = { username: '', password: '' };
  private apiRoute = 'users/login';
  onLogin() {
    this._ApiService.post(this.apiRoute, this.credentials).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err),
      complete: () => {
        console.log('logged in');
        this.sessionManagerService.newSession();
        this.router.navigate(['/account']);
      },
    });
  }
  constructor(
    private _ApiService: ApiService,
    private sessionManagerService: SessionManagerService,
    private cookieService: CookieService,
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Login | Zone Connect');
  }
}
