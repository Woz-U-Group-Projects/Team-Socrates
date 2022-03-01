import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './shared/services/api.service';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule } from '@angular/material/core';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent,NavbarComponent ],
  entryComponents: [],
  imports: [CommonModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, BrowserAnimationsModule, MatCommonModule,MatToolbarModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
