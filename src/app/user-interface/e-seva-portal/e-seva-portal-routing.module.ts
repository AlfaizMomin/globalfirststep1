import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ESevaKendraComponent } from './e-seva-kendra/e-seva-kendra.component';

const routes: Routes = [{ path: '', component: ESevaKendraComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ESevaPortalRoutingModule {}
