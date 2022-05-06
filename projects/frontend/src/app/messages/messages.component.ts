import {Component, OnInit} from '@angular/core';
import {MessagesService} from 'projects/frontend/src/app/services/messages.service';
import {Observable} from 'rxjs';
import {Message} from 'projects/frontend/src/app/interfaces/message';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {PhoneService} from 'projects/frontend/src/app/services/phone.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages$!: Observable<Message[]>;
  phone$: Observable<string>;

  constructor(private messagesSvc: MessagesService, private phoneSvc: PhoneService) {
    this.messages$ = this.messagesSvc.messages$;
    this.phone$ = this.phoneSvc.phone$;
  }

  ngOnInit(): void {
  }

}
