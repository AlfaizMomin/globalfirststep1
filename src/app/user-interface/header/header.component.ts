import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output()
  categoryEventEmitter = new EventEmitter();

  @Input() count;
  subTitle: any = [
    'Igniting Your Journey to Success',
    'Where Real Estate Dreams Take Shape',
    'Shaping Your Financial Future',
  ];
  menuOption: any = [
    {
      path: 'Jobs',
      title: 'Jobs',
      class: '',
    },
    {
      path: 'finance',
      title: 'Finance (All Over India)',
      class: '',
    },
    {
      path: 'real-estate',
      title: 'Real-Estate (Only Pune)',
      class: '',
    },
    {
      path: 'e-seva',
      title: 'E-Seva',
      class: '',
    },
  ];

  onClick(e: any) {
    this.categoryEventEmitter.emit(e);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.count = changes.count.currentValue;
  }
}
