import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import {
  Routes,
  RouterModule,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { UserPageComponent } from './user-page/user-page.component';

@NgModule({
  declarations: [AppComponent, UserPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
