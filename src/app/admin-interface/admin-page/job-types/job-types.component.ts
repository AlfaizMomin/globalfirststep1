import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { FireServiceService } from 'src/app/fire-service.service';
@Component({
  selector: 'app-job-types',
  templateUrl: './job-types.component.html',
  styleUrls: ['./job-types.component.scss'],
})
export class JobTypesComponent {
  public jobCatagoryForm: FormGroup;
  jobCategory = [];
  submitted = false;
  showLoader = true;
  isEdit = false;
  selectedId = '';
  @ViewChild('closebutton') closebutton;
  constructor(
    private fireService: FireServiceService,
    public form: FormBuilder
  ) {
    this.jobCatagoryForm = this.form.group({
      name: ['', [Validators.required]],
    });

    this.getJobCategories();
  }

  getJobCategories() {
    this.fireService
      .getJobCategoryItem()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.jobCategory = data;
        this.showLoader = false;
      });
  }

  Submit() {
    this.submitted = true;
    if (this.jobCatagoryForm.valid) {
      if (this.isEdit) {
        this.fireService.updateJobCategory(
          this.selectedId,
          this.jobCatagoryForm.value
        );
      } else {
        this.fireService.addJobCategoryItem(this.jobCatagoryForm.value);
      }
      this.isEdit = false;
      this.submitted = false;
      this.closebutton.nativeElement.click();
      this.jobCatagoryForm.controls['name'].setValue('');
    }
  }

  deleteItem(id) {
    this.fireService.deleteJobCategoryById(id);
  }

  edit(obj) {
    this.isEdit = true;
    this.selectedId = obj.id;
    this.jobCatagoryForm.controls['name'].setValue(obj.name);
  }

  openPopup() {
    this.jobCatagoryForm.reset();
  }
}
