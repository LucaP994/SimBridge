import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MCDUPage } from './mcdu.page';

const routes: Routes = [
  {
    path: '',
    component: MCDUPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MCDUPageRoutingModule {}
