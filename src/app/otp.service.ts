import { Injectable } from '@angular/core';
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth';
import { WindowService } from 'src/app/window.service';
import { ToastService } from './toast.service';
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class OtpService {
  mobileNumberString: string = '';
  verifyOtpString: string = '';
  winRef: any;
  modalRef: any;

  constructor(
    private windowRef: WindowService,
    private toastMsg: ToastService
  ) {
    this.winRef = windowRef;
  }

  sendLoginOtp(number) {
    const auth = getAuth();
    this.winRef.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
      },
      auth
    );

    const appVerifier = this.winRef.recaptchaVerifier;
    signInWithPhoneNumber(auth, '+91' + number, appVerifier)
      .then((confirmationResult) => {
        this.winRef.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        this.toastMsg.showBasicComponent(error.message);
      });
  }

  verifyOtp() {
    return this.winRef.confirmationResult.confirm(this.verifyOtpString);
  }

  GoogleAuth() {
    this.windowRef.GoogleAuth();
  }
}
