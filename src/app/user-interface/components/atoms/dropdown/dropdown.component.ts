import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() field: any = {};
  @Input() form: FormGroup;
  @Output() selectedDropdownKey = new EventEmitter();
  constructor() {}

  onDropdownChange(e) {
    this.selectedDropdownKey.emit(e);
  }
}
