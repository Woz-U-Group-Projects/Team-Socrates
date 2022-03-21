import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManagerService } from 'src/app/core/services/session-manager.service';
import { Subscription, map } from 'rxjs';
import { NotificationsPreview } from 'src/app/shared/models/notificationsPreview';
import { NotificationsService } from '../../services/notifications.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  @Output() sidenavToggle = new EventEmitter<void>();
  @Output() notificationsToggle = new EventEmitter<void>();
  notificationsPreview: number;
  @Input() notificationsStatus: string = 'notifications';
  log() {
    console.log(this.notificationsPreview);
  }
  toggleSidebar() {
    this.sidenavToggle.emit();
  }
  toggleNotifications() {
    this.notificationsToggle.emit();
  }
  constructor(
    private _sessionManagerService: SessionManagerService,
    private router: Router,
    private _notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    this._sessionManagerService.loginState$().subscribe({
      next: (res) => {
        this.loggedIn = res;
      },
    });
    this._notificationsService.unreadCountState$().subscribe({
      next: (num) => {
        this.notificationsPreview = num;
      },
    });
  }
}
