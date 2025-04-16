import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import { authInterceptor } from './core/auth.interceptor';

const firebaseConfig = {
  apiKey: 'AIzaSyBz9uUj8eclq8fUyxAfXvdrY0nlhTfdpBo',
  authDomain: 'dotdance-afb45.firebaseapp.com',
  projectId: 'dotdance-afb45',
  storageBucket: 'dotdance-afb45.firebasestorage.app',
  messagingSenderId: '474099681145',
  appId: '1:474099681145:web:e053a189bcbb2e662911a8',
  measurementId: 'G-Q6QS10QJ79',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};

initializeApp(firebaseConfig);
