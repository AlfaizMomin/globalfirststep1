import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancePortalRoutingModule } from './finance-portal-routing.module';
import { FinanceComponent } from './finance/finance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [FinanceComponent],
  imports: [
    CommonModule,
    FinancePortalRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class FinancePortalModule {}
