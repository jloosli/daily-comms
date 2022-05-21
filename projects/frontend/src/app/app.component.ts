import {ChangeDetectionStrategy, Component } from '@angular/core';
import {CloudMessagingService} from 'projects/frontend/src/app/services/cloud-messaging.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'Daily Comms';
  token$:Observable<string>;

  constructor(private cm: CloudMessagingService) {
    cm.request();
    this.token$ = cm.token$;
  }

}
