import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { UserNotification } from 'src/app/shared/models/userNotification';
import { SessionManagerService } from './session-manager.service';
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  loggedIn: boolean;
  private unreadCount$ = new BehaviorSubject<number>(0);
  private count$ = new BehaviorSubject<number>(0);

  constructor(
    private _apiService: ApiService,
    private _sessionManagerService: SessionManagerService
  ) {}

  onStart() {
    this._sessionManagerService.loginState$().subscribe({
      next: (res) => {
        this.loggedIn = res;
      },
    });
    this.getTotalCount();
    this.getUnreadCount();
    const interval = setInterval(() => {
      if (this.loggedIn) {
        this.getUnreadCount();
      }
    }, 5000);
  }

  unreadCountState$(): Observable<number> {
    return this.unreadCount$.asObservable();
  }
  countState$(): Observable<number> {
    return this.count$.asObservable();
  }

  getUnreadCount(): void {
    this._apiService.get('users/notifications/newcount').subscribe({
      next: (data: string) => {
        this.unreadCount$.next(parseInt(data));
      },
    });
  }
  getTotalCount(): void {
    this._apiService.get('users/notifications/count').subscribe({
      next: (data: string) => {
        this.count$.next(parseInt(data));
      },
    });
  }
  getNotifications(limit: number, offset: number): Observable<any> {
    return this._apiService.get(
      `users/notifications?limit=${limit}&offset=${offset}`
    );
  }
  markAll(): void {
    this._apiService.put('users/notifications').subscribe({});
  }
}
