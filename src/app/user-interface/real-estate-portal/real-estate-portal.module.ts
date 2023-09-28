import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealEstatePortalRoutingModule } from './real-estate-portal-routing.module';
import { RealEstateComponent } from './real-estate/real-estate.component';
import { RealStateDetailsComponent } from './real-state-details/real-state-details.component';

@NgModule({
  declarations: [RealEstateComponent, RealStateDetailsComponent],
  imports: [CommonModule, RealEstatePortalRoutingModule],
})
export class RealEstatePortalModule {}
