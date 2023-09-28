import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ESevaPortalRoutingModule } from './e-seva-portal-routing.module';
import { ESevaKendraComponent } from './e-seva-kendra/e-seva-kendra.component';


@NgModule({
  declarations: [
    ESevaKendraComponent
  ],
  imports: [
    CommonModule,
    ESevaPortalRoutingModule
  ]
})
export class ESevaPortalModule { }
