import {Component, OnInit} from '@angular/core';
import {MessagesService} from 'projects/frontend/src/app/services/messages.service';
import {Observable} from 'rxjs';
import {Message} from 'projects/frontend/src/app/interfaces/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages$!: Observable<Message[]>;

  constructor(private messagesSvc: MessagesService) {
    this.messages$ = this.messagesSvc.messages$;
  }

  ngOnInit(): void {
  }

}
