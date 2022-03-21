import { Injectable } from '@angular/core';
import { Observable, Observer, BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class SessionManagerService {
  constructor(private cookieService: CookieService) {
    this.newSession();
  }
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  sessionLength: number;
  newSession(): void {
    if (this.cookieService.check('PUBLIC_ID')) {
      this.loggedIn$.next(true);
    }
  }
  sessionTimer = new Observable((observer: Observer<number>) => {
    const currentTime = Date.now();
    const expirationTime = new Date(
      this.cookieService.get('SESSION_EXPIRATION')
    );
    this.sessionLength = Math.floor(
      (expirationTime.getTime() - currentTime) / 1000
    );
    const interval = setInterval(() => {
      if (this.sessionLength <= 0) {
        clearInterval(interval);
        observer.complete();
      }
      this.sessionLength--;
      observer.next(this.sessionLength);
    }, 1000);
  });
  endSession(): void {
    this.cookieService.delete('PUBLIC_ID');
    this.loggedIn$.next(false);
    this.sessionLength = 0;
  }
  loginState$(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }
}
