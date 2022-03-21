import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserNotification } from 'src/app/shared/models/userNotification';
import { EntityActionType } from 'src/app/shared/enums/entityActionType';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-single-notification',
  templateUrl: './single-notification.component.html',
  styleUrls: ['./single-notification.component.scss'],
})
export class SingleNotificationComponent implements OnInit {
  @Input() notification: UserNotification;
  @Output() action = new EventEmitter<void>();
  public get EntityActionType(): typeof EntityActionType {
    return EntityActionType;
  }
  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    console.log(this.notification);
  }
  getStyles(): Object {
    if (this.notification.readStatus === true) {
      return {
        backgroundColor: 'darkgray',
        color: 'rgba(0,0,0,.26)',
      };
    }
    return {};
  }
  accept() {
    this._apiService
      .put(
        `social/friends/incomingRequests/${this.notification.globalNotification.actor.userId}`
      )
      .subscribe({
        next: (res) => {
          this.deleteNotification();
        },
      });
  }
  decline() {
    this._apiService
      .delete(
        `social/friends/incomingRequests/${this.notification.globalNotification.actor.userId}`
      )
      .subscribe({
        next: (res) => {
          this.deleteNotification();
        },
      });
  }
  markAsRead() {
    this._apiService
      .put(
        `users/notifications/${this.notification.globalNotification.notificationId}`,
        { readStatus: true }
      )
      .subscribe({
        next: (res) => {
          this.action.emit();
        },
      });
  }
  deleteNotification() {
    this._apiService
      .delete(
        `users/notifications/${this.notification.globalNotification.notificationId}`
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.action.emit();
        },
      });
  }
}
