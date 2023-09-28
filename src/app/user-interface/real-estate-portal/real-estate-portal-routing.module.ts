import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealEstateComponent } from './real-estate/real-estate.component';
import { RealStateDetailsComponent } from './real-state-details/real-state-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'details', pathMatch: 'full' },
  { path: 'details', component: RealEstateComponent },
  {
    path: 'details/real-estate-detail/:category',
    component: RealStateDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RealEstatePortalRoutingModule {}
