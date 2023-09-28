import { Component } from '@angular/core';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss'],
})
export class RealEstateComponent {
  windowRef: any;
  category = [
    { name: 'Resale', desc: ' Exploring Resale Properties' },
    { name: 'New Property', desc: ' The Appeal of New Properties' },
    { name: 'Bank Property', desc: ' Exploring Bank-Owned Real Estate' },
    { name: 'Rent', desc: ' A Tenants Guide to Property Search' },
  ];
  constructor() {}
}
