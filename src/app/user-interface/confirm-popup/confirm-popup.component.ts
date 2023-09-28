import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
})
export class ConfirmPopupComponent {
  @Input() public user;
  winRef: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(private toastService: ToastService) {}
  ngOnInit() {}

  otpMove(o1: any, o2: any, o3: any, o4: any, o5: any, o6: any) {
    const length = o3.value.length;
    const maxlength = o3.getAttribute('maxlength');
    if (length == maxlength) {
      if (o6 == '') {
        return;
      }
      if (o4 != '') {
        o4.focus();
      }
    }
    if (o1.key == 'Backspace') {
      if (o2 != '') {
        o2.focus();
      }
    }
  }

  verify(id1: any, id2: any, id3: any, id4: any, id5: any, id6: any) {
    this.passEntry.emit(
      id1 + '' + id2 + '' + id3 + '' + id4 + '' + id5 + '' + id6
    );
  }
}
