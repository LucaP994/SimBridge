import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MCDUPageRoutingModule } from './mcdu-routing.module';

import { MCDUPage } from './mcdu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MCDUPageRoutingModule
  ],
  declarations: [MCDUPage]
})
export class MCDUPageModule {}
