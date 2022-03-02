import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [ NavbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MatCommonModule,
    MatToolbarModule
  ],
  exports: [
    NavbarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatCommonModule,
    MatToolbarModule
  ]

})
export class SharedModule { }
