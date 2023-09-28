import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { JobTypesComponent } from './job-types/job-types.component';
import { JobFormsComponent } from './job-forms/job-forms.component';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';
import { FinanceComponent } from './finance/finance.component';
import { RealEstateComponent } from './real-estate/real-estate.component';
import { ESevaKendraComponent } from './e-seva-kendra/e-seva-kendra.component';
import { RealEstateFormsComponent } from './real-estate-forms/real-estate-forms.component';

const routes: Routes = [
  { path: '', component: ClientDetailComponent },
  { path: 'client-detail', component: ClientDetailComponent },
  { path: 'candidate-detail', component: CandidateDetailComponent },
  { path: 'job-form', component: JobFormsComponent },
  { path: 'Finance', component: FinanceComponent },
  { path: 'Real-Estate', component: RealEstateComponent },
  { path: 'E-Seva-Kendra', component: ESevaKendraComponent },
  { path: 'job-type', component: JobTypesComponent },
  { path: 'real-estate-forms', component: RealEstateFormsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
