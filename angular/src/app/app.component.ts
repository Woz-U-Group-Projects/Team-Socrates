import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  navbar: boolean = false;

  public constructor() {}
  title = 'angular';
  toggle() {
    this.navbar = !this.navbar;
  }
}
