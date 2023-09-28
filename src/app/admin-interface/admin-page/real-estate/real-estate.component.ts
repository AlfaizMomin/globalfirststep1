import { Component } from '@angular/core';
import { map } from 'rxjs';
import { DownloadcsvService } from 'src/app/downloadcsv.service';
import { FireServiceService } from 'src/app/fire-service.service';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss'],
})
export class RealEstateComponent {
  propertyData = [];
  actualPropertyData = [];
  constructor(
    private fireService: FireServiceService,
    private downloadCsv: DownloadcsvService
  ) {
    this.fireService
      .getPropertyDetailsItem()
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
        this.propertyData = data;
        this.actualPropertyData = this.propertyData;
      });
  }

  deleteItem(id) {
    this.fireService.deletePropertyById(id);
  }

  searchByName(e: any) {
    if (e.length == 0) {
      this.propertyData = this.actualPropertyData;
    } else {
      this.propertyData = this.actualPropertyData.filter((el) => {
        return (
          el.purchase_type.toLowerCase().includes(e.toLowerCase()) ||
          el.firstName.toLowerCase().includes(e.toLowerCase())
        );
      });
    }
  }

  getCsv() {
    let headers = Object.keys(Object.assign({}, ...this.actualPropertyData));
    this.downloadCsv.download(
      this.actualPropertyData,
      headers,
      'property_details'
    );
  }
}
