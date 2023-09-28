import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'global_firststep';
  loader = true;
  constructor() {
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  }
}
