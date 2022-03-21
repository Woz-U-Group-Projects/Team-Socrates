import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UserNotification } from 'src/app/shared/models/userNotification';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss'],
})
export class UserNotificationsComponent implements OnInit, OnChanges {
  constructor(private _notificationsService: NotificationsService) {}
  @Input() focus: boolean = false;
  count: number = 0;
  currentNotifications: UserNotification[];
  paginator: PageEvent;
  ngOnInit(): void {
    this._notificationsService.countState$().subscribe({
      next: (num) => (this.count = num),
    });
    this.paginator = {
      pageSize: 5,
      pageIndex: 0,
      length: this.count,
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.focus == true) {
      this.update();
      this.paginator = {
        pageSize: 5,
        pageIndex: 0,
        length: this.count,
      };
    }
  }
  update(): void {
    this._notificationsService.getTotalCount();
    this._notificationsService.getUnreadCount();
    this._notificationsService
      .getNotifications(this.paginator.pageSize, this.paginator.pageIndex)
      .subscribe({
        next: (notifications) => {
          this.currentNotifications = notifications;
        },
      });
  }
  markAll(): void {
    this._notificationsService.markAll();
    this.update();
  }
}
