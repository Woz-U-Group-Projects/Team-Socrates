import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AgePipe } from './pipes/age.pipe';
import { GenderPipe } from './pipes/gender.pipe';
@NgModule({
  declarations: [ NavbarComponent, AgePipe, GenderPipe,],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MatCommonModule,
    MatToolbarModule,
  ],
  exports: [
    NavbarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatCommonModule,
    MatToolbarModule,
    AgePipe,
    GenderPipe
  ]

})
export class SharedModule { }
