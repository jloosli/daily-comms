import {Injectable, Optional} from '@angular/core';
import {getToken, Messaging, onMessage} from '@angular/fire/messaging';
import {EMPTY, from, Observable, share, tap} from 'rxjs';
import {environment} from 'projects/frontend/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CloudMessagingService {

  token$: Observable<any> = EMPTY;
  message$: Observable<any> = EMPTY;
  showRequest = false;


  constructor(@Optional() messaging: Messaging) {
    if (messaging) {
      this.token$ = from(
        navigator.serviceWorker.register('firebase-messaging-sw.js', {
          type: 'module',
          scope: '/',
        }).then(serviceWorkerRegistration =>
          getToken(messaging, {
            serviceWorkerRegistration,
            vapidKey: environment.firebase.vapidKey,
          }),
        )).pipe(
        tap(token => console.log('FCM - token', {token})),
        share(),
      );
      this.message$ = new Observable(sub => onMessage(messaging, it => sub.next(it)))
        .pipe(
          tap(payload => console.log('FCM - payload', payload)),
        );
      this.message$.subscribe();
      this.token$.subscribe();
    }
  }

  request() {
    Notification.requestPermission();
  }
}
