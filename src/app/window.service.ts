import { Injectable } from '@angular/core';
import { GoogleAuthProvider, signOut, getAuth } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  constructor(
    public router: Router,
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) {}
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        //Sessions
        let JsonData = {
          name: result.user?.displayName,
          email: result.user?.email,
        };

        localStorage.setItem('data', JSON.stringify(JsonData));

        this.router.navigate(['dashboard']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signOut() {
    const auth = getAuth();
    localStorage.clear();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        this.router.navigate(['login']);
      })
      .catch((error) => {
        // An error happened.
      });
  }
}
