import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./admin-page/admin-page.module').then((x) => x.AdminPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminInterfaceRoutingModule {}
