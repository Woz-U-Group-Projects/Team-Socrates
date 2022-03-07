import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { first } from 'rxjs'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  newUser: any = {username: '', password: '', email: '', screenName: ''};
  private apiRoute = 'users';
  userSubmit() {
    this._ApiService.post(this.apiRoute, this.newUser).pipe(first()).subscribe({
      next: res => console.log(res),
      error: err => {console.error(err)},
    }
    
    )
  }
  constructor(private _ApiService: ApiService) { }

  ngOnInit(): void {
  }

}
