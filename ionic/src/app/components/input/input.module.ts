import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular/';
import { InputComponent } from './input.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [InputComponent],
    imports: [IonicModule, CommonModule ],
    exports: [InputComponent],
    providers: [],
})
export class InputModule {}