import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';
import { JobFormsComponent } from './job-forms/job-forms.component';
import { JobTypesComponent } from './job-types/job-types.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinanceComponent } from './finance/finance.component';
import { ESevaKendraComponent } from './e-seva-kendra/e-seva-kendra.component';
import { RealEstateComponent } from './real-estate/real-estate.component';
// material dependencies
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { NoDataComponent } from './no-data/no-data.component';
import { LoaderComponent } from './loader/loader.component';
import { RealEstateFormsComponent } from './real-estate-forms/real-estate-forms.component';
@NgModule({
  declarations: [
    ClientDetailComponent,
    CandidateDetailComponent,
    JobFormsComponent,
    JobTypesComponent,
    FinanceComponent,
    ESevaKendraComponent,
    RealEstateComponent,
    NoDataComponent,
    LoaderComponent,
    RealEstateFormsComponent,
  ],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatDividerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
  ],
})
export class AdminPageModule {}
