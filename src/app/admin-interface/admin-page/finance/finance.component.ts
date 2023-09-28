import { Component } from '@angular/core';
import { map } from 'rxjs';
import { DownloadcsvService } from 'src/app/downloadcsv.service';
import { FireServiceService } from 'src/app/fire-service.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
})
export class FinanceComponent {
  financeData = [];
  showLoader = true;
  actualFinanceData = [];
  constructor(
    private fireService: FireServiceService,
    private downloadCsv: DownloadcsvService
  ) {
    this.fireService
      .getLoanDetailsItem()
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
        this.financeData = data;
        this.actualFinanceData = this.financeData;
        this.showLoader = false;
      });
  }

  deleteItem(id) {
    this.fireService.deleteFinanceDataById(id);
  }

  searchByName(e: any) {
    if (e.length == 0) {
      this.financeData = this.actualFinanceData;
    } else {
      this.financeData = this.actualFinanceData.filter((el) =>
        el.type.toLowerCase().includes(e.toLowerCase())
      );
    }
  }

  getCsv() {
    let headers = Object.keys(Object.assign({}, ...this.actualFinanceData));
    this.downloadCsv.download(
      this.actualFinanceData,
      headers,
      'finance_details'
    );
  }
}
