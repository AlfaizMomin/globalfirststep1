import { Component } from '@angular/core';
import { map } from 'rxjs';
import { DownloadcsvService } from 'src/app/downloadcsv.service';
import { FireServiceService } from 'src/app/fire-service.service';

@Component({
  selector: 'app-e-seva-kendra',
  templateUrl: './e-seva-kendra.component.html',
  styleUrls: ['./e-seva-kendra.component.scss'],
})
export class ESevaKendraComponent {
  actualClientData = [];
  eSevaData = [];
  showLoader = true;
  constructor(
    private fireService: FireServiceService,
    private downloadService: DownloadcsvService
  ) {
    this.fireService
      .geteSevaDetailsItem()
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
        this.eSevaData = data;
        this.actualClientData = this.eSevaData;
        this.showLoader = false;
      });
  }

  searchByName(e: any) {
    if (e.length == 0) {
      this.eSevaData = this.actualClientData;
    } else {
      this.eSevaData = this.actualClientData.filter((el) => {
        return (
          el.firstName.toLowerCase().includes(e.toLowerCase()) ||
          el.document_type.toLowerCase().includes(e.toLowerCase())
        );
      });
    }
  }

  getCsv() {
    let headers = Object.keys(Object.assign({}, ...this.actualClientData));
    this.downloadService.download(
      this.actualClientData,
      headers,
      'eSeva_details'
    );
  }

  deleteItem(id: string) {
    this.fireService.deleteESevaById(id);
  }
}
