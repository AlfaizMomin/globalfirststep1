import { Component } from '@angular/core';
import { map } from 'rxjs';
import { DownloadcsvService } from 'src/app/downloadcsv.service';
import { FireServiceService } from 'src/app/fire-service.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent {
  actualClientData = [];
  clientData = [];
  showLoader = true;
  constructor(
    private fireService: FireServiceService,
    private downloadService: DownloadcsvService
  ) {
    this.fireService
      .getClientItem()
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
        this.clientData = data;
        this.actualClientData = this.clientData;
        this.showLoader = false;
      });
  }

  deleteItem(id: string) {
    this.fireService.deleteClientDetailById(id);
  }

  searchByName(e: any) {
    if (e.length == 0) {
      this.clientData = this.actualClientData;
    } else {
      this.clientData = this.actualClientData.filter((el) => {
        return el.firstName.toLowerCase().includes(e.toLowerCase());
      });
    }
  }

  getCsv() {
    let headers = Object.keys(Object.assign({}, ...this.actualClientData));
    this.downloadService.download(
      this.actualClientData,
      headers,
      'client_details'
    );
  }
}
