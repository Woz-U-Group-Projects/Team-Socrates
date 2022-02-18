import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccounteditPage } from './accountedit.page';

const routes: Routes = [
  {
    path: '',
    component: AccounteditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccounteditPageRoutingModule {}
