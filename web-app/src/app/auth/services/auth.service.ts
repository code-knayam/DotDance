import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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
import { BehaviorSubject, Observable, firstValueFrom, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  private provider;
  private httpClient = inject(HttpClient);
  private authBaseUrl = `${environment.apiUrl}/api/auth/login`;

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
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        const user = result.user;

        console.log(credential, result);
        return {
          user,
          resp: await firstValueFrom(
            this.loginUser({ email: user.email!, name: user.displayName! })
          ),
        };
      })
      .then(({ user, resp }) => {
        this.userSubject.next(user);
        console.log('User logged in successfully:', resp);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  loginUser(userData: { email: string; name: string }) {
    return this.httpClient.post(this.authBaseUrl, {
      user: {
        email: userData.email,
        name: userData.name,
      },
    });
  }

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
