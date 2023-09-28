import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInterfaceRoutingModule } from './user-interface-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserinterfaceComponent } from './userinterface/userinterface.component';
import { JobPortalComponent } from './job-portal/job-portal.component';
import { ClientReviewComponent } from './client-review/client-review.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobCategoryDetailComponent } from './job-category-detail/job-category-detail.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserFormsComponent } from './user-forms/user-forms.component';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';
import { GallaryComponent } from './gallary/gallary.component';
import { NoResultComponent } from './no-result/no-result.component';
import { JobFormsComponent } from './job-forms/job-forms.component';
import { LoanFormsComponent } from './loan-forms/loan-forms.component';
import { DynamicFormBuilderComponent } from './dynamic-form-builder/dynamic-form-builder.component';
import { FieldBuilderComponent } from './components/field-builder/field-builder.component';
import { TextboxComponent } from './components/atoms/textbox/textbox.component';
import { RadioComponent } from './components/atoms/radio/radio.component';
import { FileComponent } from './components/atoms/file/file.component';
import { DropdownComponent } from './components/atoms/dropdown/dropdown.component';
import { RealEstateFormsComponent } from './real-estate-forms/real-estate-forms.component';
import { ESevaFormsComponent } from './e-seva-forms/e-seva-forms.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UserinterfaceComponent,
    JobPortalComponent,
    ClientReviewComponent,
    JobCategoryDetailComponent,
    UserFormsComponent,
    ConfirmPopupComponent,
    GallaryComponent,
    NoResultComponent,
    JobFormsComponent,
    LoanFormsComponent,
    DynamicFormBuilderComponent,
    FieldBuilderComponent,
    TextboxComponent,
    RadioComponent,
    FileComponent,
    DropdownComponent,
    RealEstateFormsComponent,
    ESevaFormsComponent,
    AboutUsComponent,
  ],
  imports: [
    CommonModule,
    UserInterfaceRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class UserInterfaceModule {}
