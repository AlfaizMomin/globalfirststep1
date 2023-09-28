import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.scss'],
})
export class DynamicFormBuilderComponent implements OnChanges {
  @Output() onSubmit = new EventEmitter();
  @Output() selectedValue = new EventEmitter();
  @Output() FileValue = new EventEmitter();
  submittedForm = false;
  @Input() fields: any[] = [];
  form: FormGroup;
  constructor() {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    let fieldsCtrls = {};
    for (let f of this.fields) {
      if (f.type != 'checkbox') {
        fieldsCtrls[f.name] = new FormControl(
          f.value || '',
          Validators.required
        );
      } else {
        let opts = {};
        for (let opt of f.options) {
          opts[opt.key] = new FormControl(opt.value);
        }
        fieldsCtrls[f.name] = new FormGroup(opts);
      }
    }
    this.form = new FormGroup(fieldsCtrls);
  }

  submit() {
    this.submittedForm = true;
    this.onSubmit.emit(this.form);
  }

  getSelectedVal(e) {
    this.selectedValue.emit(e);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.fields = changes.fields.currentValue;
    this.initializeForm();
  }

  getFile(e) {
    this.FileValue.emit(e);
  }
}
