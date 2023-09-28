import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent {
  @Input() field: any = {};
  @Input() form: FormGroup;
  @Output() FilePath = new EventEmitter();
  get isValid() {
    return this.form.controls[this.field.name].valid;
  }
  get isDirty() {
    return this.form.controls[this.field.name].dirty;
  }

  constructor() {}

  ngOnChange() {}

  imageUpload(e) {
    this.FilePath.emit(e);
  }
}
