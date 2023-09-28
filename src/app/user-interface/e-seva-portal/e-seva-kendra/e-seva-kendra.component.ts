import { Component } from '@angular/core';

@Component({
  selector: 'app-e-seva-kendra',
  templateUrl: './e-seva-kendra.component.html',
  styleUrls: ['./e-seva-kendra.component.scss'],
})
export class ESevaKendraComponent {
  Category = ['PAN Card', 'Aadhar Card', 'Passport', 'Driving License'];
  constructor() {}
}
