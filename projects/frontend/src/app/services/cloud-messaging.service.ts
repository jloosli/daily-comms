import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudMessagingService {

  constructor(private afMessaging: AngularFire) { }
}
