import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { FireServiceService } from 'src/app/fire-service.service';

@Component({
  selector: 'app-userinterface',
  templateUrl: './userinterface.component.html',
  styleUrls: ['./userinterface.component.scss'],
})
export class UserinterfaceComponent {
  category = 'Jobs';
  uuid = [];
  constructor(
    private route: ActivatedRoute,
    private firebase: FireServiceService
  ) {
    const path = this.route.snapshot.paramMap.get('category');
    this.onClick(path);
  }
  onClick(e) {
    this.category = e;
  }
}
