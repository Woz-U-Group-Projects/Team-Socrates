import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManagerService } from 'src/app/core/services/session-manager.service';
import { Subscription, map } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  timer: string;
  @Output() sidenavToggle = new EventEmitter();
  sidenav: boolean = false;
  toggle() {
    this.sidenavToggle.emit();
  }
  constructor(
    private sessionManagerService: SessionManagerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sessionManagerService.checkLoggedIn$().subscribe({
      next: (res) => {
        this.loggedIn = res;
        if (res === true) {
          this.sessionTime();
        }
      },
      error: (err) => {
        console.error(`${err.error}\n${err.message}`);
      },
    });
  }

  sessionTime() {
    this.sessionManagerService.sessionTimer.subscribe({
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
