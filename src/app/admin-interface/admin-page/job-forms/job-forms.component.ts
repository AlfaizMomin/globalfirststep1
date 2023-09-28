import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { FireServiceService } from 'src/app/fire-service.service';
@Component({
  selector: 'app-job-forms',
  templateUrl: './job-forms.component.html',
  styleUrls: ['./job-forms.component.scss'],
})
export class JobFormsComponent implements OnInit {
  jobCategory = [];
  allJobDetail = [];
  actualJobDetail = [];
  jobDetails: FormGroup;
  submitted = false;
  showLoader = true;
  isEdit = false;
  selectedId = '';
  @ViewChild('closebutton') closebutton;
  constructor(public fireService: FireServiceService, public fb: FormBuilder) {}
  ngOnInit() {
    this.jobDetails = this.fb.group({
      job_category: ['', [Validators.required]],
      vacancy: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.getJobCategories();
    this.getJobDetails();
  }

  Submit() {
    this.submitted = true;
    if (this.jobDetails.valid) {
      if (this.isEdit) {
        this.fireService.updateJobDetails(
          this.selectedId,
          this.jobDetails.value
        );
      } else {
        this.fireService
          .addJobDetailsItem(this.jobDetails.value)
          .then((res) => {});
      }
      this.jobDetails.reset();
      this.submitted = false;
      this.isEdit = false;
      this.closebutton.nativeElement.click();
    }
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
      });
  }

  getJobDetails() {
    this.fireService
      .getJobDetailsItem()
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
        this.allJobDetail = [];
        this.allJobDetail = data;
        this.actualJobDetail = this.allJobDetail;
        this.showLoader = false;
      });
  }

  deleteItem(id) {
    this.fireService.deleteJobDetailsById(id);
  }

  searchByName(searchVal: any) {
    if (searchVal.length == 0) {
      this.allJobDetail = this.actualJobDetail;
    } else {
      this.allJobDetail = this.actualJobDetail.filter((e) =>
        e.job_category.toLowerCase().includes(searchVal.toLowerCase())
      );
    }
  }

  edit(obj) {
    this.isEdit = true;
    this.selectedId = obj.id;
    this.jobDetails.setValue({
      job_category: obj.job_category,
      vacancy: obj.vacancy,
      location: obj.location,
      description: obj.description,
    });
  }

  openPopup() {
    this.jobDetails.reset();
  }
}
