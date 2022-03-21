import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from './components/header/header.component';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { NotificationsService } from './services/notifications.service';
import { UserNotificationsComponent } from './components/user-notifications/user-notifications.component';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SingleNotificationComponent } from './components/single-notification/single-notification.component';
@NgModule({
  declarations: [
    HeaderComponent,
    UserNotificationsComponent,
    SingleNotificationComponent,
  ],
  imports: [
    CommonModule,
    MatCommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatBadgeModule,
    MatListModule,
    MatPaginatorModule,
    MatCardModule,
    MatTooltipModule,
  ],
  exports: [HeaderComponent, UserNotificationsComponent],
  providers: [ApiService, CookieService, NotificationsService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('Core module only needs to be imported into the root!');
    }
  }
}
