import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  newUser: any = { username: '', password: '', email: '', screenName: '' };
  private apiRoute = 'users';
  userSubmit() {
    this._ApiService.post(this.apiRoute, this.newUser).subscribe({
      next: (res) => console.log(res),
      error: (err) => {
        console.error(err);
      },
      complete: () => this.router.navigate(['/login']),
    });
  }
  constructor(
    private _ApiService: ApiService,
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Sign Up | Zone Connect');
  }
}
