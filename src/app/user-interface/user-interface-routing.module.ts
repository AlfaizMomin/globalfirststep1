import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserinterfaceComponent } from './userinterface/userinterface.component';
import { JobPortalComponent } from './job-portal/job-portal.component';
import { JobCategoryDetailComponent } from './job-category-detail/job-category-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'Jobs', pathMatch: 'full' },
  { path: 'Jobs', component: JobPortalComponent },
  // { path: 'job-detail', component: JobPortalComponent },
  {
    path: 'Jobs/job-category-detail/:category',
    component: JobCategoryDetailComponent,
  },
  {
    path: 'finance',
    loadChildren: () =>
      import('./finance-portal/finance-portal.module').then(
        (x) => x.FinancePortalModule
      ),
  },
  {
    path: 'real-estate',
    loadChildren: () =>
      import('./real-estate-portal/real-estate-portal.module').then(
        (x) => x.RealEstatePortalModule
      ),
  },
  {
    path: 'e-seva',
    loadChildren: () =>
      import('./e-seva-portal/e-seva-portal.module').then(
        (x) => x.ESevaPortalModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserInterfaceRoutingModule {}
