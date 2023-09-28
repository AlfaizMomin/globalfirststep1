import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasicSnackbarComponent } from './basic-snackbar/basic-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  showBasicComponent(content) {
    this.snackBar.openFromComponent(BasicSnackbarComponent, {
      data: { msg: content },
      duration: 900,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
