import {Component, OnInit} from '@angular/core';
import {MessagesService} from 'projects/frontend/src/app/services/messages.service';
import {Observable} from 'rxjs';
import {Message} from 'projects/frontend/src/app/interfaces/message';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages$!: Observable<Message[]>;

  constructor(private messagesSvc: MessagesService, private sanitizer: DomSanitizer) {
    this.messages$ = this.messagesSvc.messages$;
  }

  ngOnInit(): void {
  }

  setMessage({text}: Message): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`sms://5555555555?body=${text}`);
  }
}
