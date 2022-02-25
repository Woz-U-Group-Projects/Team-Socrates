import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountViewComponent } from './account-view/account-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule
  ],
  declarations: [AccountPage, AccountEditComponent, AccountViewComponent]
})
export class AccountPageModule {}
