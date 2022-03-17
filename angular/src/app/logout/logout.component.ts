import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManagerService } from '../core/services/session-manager.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  redirectMessage: string = 'Redirecting';
  secondsPassed: number = 0;
  interval: any;
  constructor(
    private router: Router,
    private sessionManagerService: SessionManagerService
  ) {}

  ngOnInit(): void {
    this.sessionManagerService.endSession();

    //Redirect in 3 seconds
    this.interval = setInterval(() => {
      this.redirectMessage = this.redirectMessage + '.';
      this.secondsPassed += 1;
      if (this.secondsPassed > 3) {
        this.router.navigate(['/home']);
      }
    }, 1000);
  }
  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
