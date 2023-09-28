import { Component } from '@angular/core';

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.scss'],
})
export class GallaryComponent {
  gallaryImages = [
    '../../../assets/home loan.jpg',
    '../../../assets/personal loan.jpg',
    '../../../assets/call.jpg',
    '../../../assets/kpo.jpg',
    '../../../assets/bpo.jpg',
    '../../../assets/center.jpg',
  ];
}
