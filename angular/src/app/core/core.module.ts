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
@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatCommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
  ],
  exports: [HeaderComponent],
  providers: [ApiService, CookieService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('Core module only needs to be imported into the root!');
    }
  }
}
