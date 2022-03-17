import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserPageRoutingModule } from './user-page-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, UserPageRoutingModule],
})
export class UserPageModule {}
