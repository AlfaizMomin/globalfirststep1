import { Component } from '@angular/core';
import { map } from 'rxjs';
import { DownloadcsvService } from 'src/app/downloadcsv.service';
import { FireServiceService } from 'src/app/fire-service.service';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss'],
})
export class CandidateDetailComponent {
  candidateData = [];
  actualCandidateData = [];
  showLoader = true;
  constructor(
    private fireService: FireServiceService,
    private downloadCsv: DownloadcsvService
  ) {
    this.fireService
      .getItem()
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
        this.candidateData = data;
        this.actualCandidateData = data;
        this.showLoader = false;
      });
  }

  deleteItem(id: string) {
    this.fireService.deleteCandidateById(id);
  }

  searchByName(e: any) {
    this.candidateData = this.actualCandidateData.filter((el) => {
      return el.first_name.toLowerCase().includes(e.toLowerCase());
    });
  }

  getCsv() {
    let headers = Object.keys(Object.assign({}, ...this.actualCandidateData));
    this.downloadCsv.download(
      this.actualCandidateData,
      headers,
      'candidate_details'
    );
  }
}
