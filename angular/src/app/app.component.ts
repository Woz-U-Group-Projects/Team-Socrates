import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManagerService } from './core/services/session-manager.service';
import { OnInit } from '@angular/core';
import { NotificationsService } from './core/services/notifications.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular';
  sidebar: boolean = false;
  notificationsbar: boolean = false;
  sidebarToggle() {
    this.sidebar = !this.sidebar;
  }
  notificationsToggle() {
    this.notificationsbar = !this.notificationsbar;
  }
  public constructor(
    private _sessionManagerService: SessionManagerService,
    private router: Router,
    private _notificationsService: NotificationsService
  ) {}
  loggedIn: boolean = false;
  // Session Length Timer
  timer: string;
  ngOnInit(): void {
    this._notificationsService.onStart();
    this._sessionManagerService.loginState$().subscribe({
      next: (res) => {
        this.loggedIn = res;
        if (res === true) {
          this.sessionTime();
        }
      },
    });
  }
  sessionTime() {
    this._sessionManagerService.sessionTimer.subscribe({
      next: (num) => {
        let min: number | string = Math.floor(num / 60);
        let sec: number | string = num % 60;
        if (min < 10) {
          min = '0' + min.toString();
        }
        if (sec < 10) {
          sec = '0' + sec.toString();
        }
        this.timer = min + ':' + sec;
        console.log(this.timer);
      },
      error: (err) => console.error(err),
      complete: () => this.router.navigate(['/logout']),
    });
  }
}
