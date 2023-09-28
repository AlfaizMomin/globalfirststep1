import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-field-builder',
  templateUrl: './field-builder.component.html',
  styleUrls: ['./field-builder.component.scss'],
})
export class FieldBuilderComponent implements OnChanges {
  @Input() field: any;
  @Input() form: any;
  @Input() submittedForm: boolean;
  @Output() selectedVal = new EventEmitter();
  @Output() selectedFile = new EventEmitter();
  get isValid() {
    return this.form.controls[this.field.name].valid;
  }
  get isDirty() {
    return this.form.controls[this.field.name].dirty;
  }

  constructor() {}

  getval(e) {
    this.selectedVal.emit(e);
  }

  ngOnChanges(changes: SimpleChanges) {}

  onFileChange(e) {
    this.selectedFile.emit(e);
  }
}
