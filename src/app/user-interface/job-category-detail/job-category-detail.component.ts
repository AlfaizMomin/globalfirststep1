import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { FireServiceService } from 'src/app/fire-service.service';

@Component({
  selector: 'app-job-category-detail',
  templateUrl: './job-category-detail.component.html',
  styleUrls: ['./job-category-detail.component.scss'],
})
export class JobCategoryDetailComponent {
  jobDetails = [];
  constructor(
    public crudApi: FireServiceService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.getJobDetailsItem();
  }

  getJobDetailsItem() {
    let param1 = this.route.snapshot.params.category;
    this.crudApi
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
        data.filter((e) => {
          if (e.job_category == param1) {
            this.jobDetails.push(e);
          }
        });
      });
  }
}
