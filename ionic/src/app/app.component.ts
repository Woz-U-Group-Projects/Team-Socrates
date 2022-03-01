import {Component} from '@angular/core';
import { ApiService } from './shared/services/api.service';
import {Observable} from 'rxjs';
import { NavbarComponent } from './components/navbar/navbar.component';
 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
 
  constructor() { }
  ngOnInit() {
  }
}