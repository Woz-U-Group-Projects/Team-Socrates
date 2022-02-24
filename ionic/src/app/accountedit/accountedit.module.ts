import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccounteditPageRoutingModule } from './accountedit-routing.module';

import { AccounteditPage } from './accountedit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccounteditPageRoutingModule
  ],
  declarations: [AccounteditPage]
})
export class AccounteditPageModule {}
