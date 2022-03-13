import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule,  } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { Routes, RouterModule, Router, RoutesRecognized } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    
    
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
