import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ApiService
  ]
})
export class CoreModule { 

  constructor(@Optional() @SkipSelf() core:CoreModule){
    if (core) {
      throw new Error("This module only needs to be imported into the root module!");
    }
  }
}
