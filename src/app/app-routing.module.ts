import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminInterfaceComponent } from './admin-interface/admin-interface/admin-interface.component';
import { UserinterfaceComponent } from './user-interface/userinterface/userinterface.component';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: 'user',
    component: UserinterfaceComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./user-interface/user-interface.module').then(
            (x) => x.UserInterfaceModule
          ),
      },
    ],
  },

  // {
  //   path: 'admin',
  //   loadChildren: () =>
  //     import('./admin-interface/admin-interface.module').then(
  //       (x) => x.AdminInterfaceModule
  //     ),
  // },

  {
    path: 'admin',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminInterfaceComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./admin-interface/admin-interface.module').then(
            (m) => m.AdminInterfaceModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
