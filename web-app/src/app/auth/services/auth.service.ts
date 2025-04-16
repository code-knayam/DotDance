import { Injectable } from '@angular/core';
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  private provider;

  constructor() {
    this.provider = new GoogleAuthProvider();

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.userSubject.next(user);
    });
  }

  async loginWithGoogle() {
    const auth = getAuth();
    const persistance = await setPersistence(auth, browserLocalPersistence);

    signInWithPopup(auth, this.provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        const user = result.user;

        console.log(credential, result);
        this.userSubject.next(user);
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  loginUser() {}

  logout() {
    const auth = getAuth();
    return signOut(auth);
  }

  get currentUser() {
    return getAuth().currentUser;
  }

  isAuthenticated(): boolean {
    return !!getAuth().currentUser;
  }
}
