import {Component} from '@angular/core';
import { ApiService } from './services/api.service';
import {Observable} from 'rxjs';
 
@Component({
  selector: 'app-root',
  template: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
 
  constructor(private _ApiService: ApiService) { }
  ngOnInit() {
    console.log("GET Test:");
    this._ApiService.get('http://localhost:3001/api/users/').subscribe(
      res => { console.log(JSON.stringify(res))},
      err => console.error(err),
      () => {console.log('***Passed!***')
        console.log("Login Test:");
        this._ApiService.post('http://localhost:3001/api/users/login', {username: "username", password: "password"}).subscribe(
        res => { console.log(JSON.stringify(res))},
        err => console.error(err),
        () => { console.log('***Passed!***')
          console.log("Authentication Test:");
          this._ApiService.get('http://localhost:3001/api/users/profile').subscribe(
          res => { console.log(JSON.stringify(res))},
          err => console.error(err),
          () => { console.log('***Passed!***')
            console.log("Update Test:");
            this._ApiService.put('http://localhost:3001/api/users/profile', {email: 'email@website.com', first_name: 'John', last_name: 'Doe', bio: 'Who I am is a mystery', area_of_study: 'undecided'}).subscribe(
            res => { console.log(JSON.stringify(res))},
            err => console.error(err),
            () => console.log('***Passed!***')
        );
      })
      })
      });
       
        
       
    
  }
}