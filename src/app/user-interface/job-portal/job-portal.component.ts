import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { FireServiceService } from 'src/app/fire-service.service';
@Component({
  selector: 'app-job-portal',
  templateUrl: './job-portal.component.html',
  styleUrls: ['./job-portal.component.scss'],
})
export class JobPortalComponent {
  jobCategory = [];
  constructor(public crudApi: FireServiceService) {}
  ngOnInit() {
    this.crudApi
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
}
