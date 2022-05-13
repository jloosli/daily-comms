import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessagesService} from 'projects/frontend/src/app/services/messages.service';
import {firstValueFrom, Observable, take} from 'rxjs';
import {Message} from 'projects/frontend/src/app/interfaces/message';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {PhoneService} from 'projects/frontend/src/app/services/phone.service';
import {ISendMessage} from 'projects/frontend/src/app/messages/select/select.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  messages$!: Observable<Message[]>;
  phone$: Observable<string>;
  smsLink: SafeResourceUrl | undefined;
  message$: Observable<Message | null>;

  constructor(private messagesSvc: MessagesService, private phoneSvc: PhoneService, private sanitizer: DomSanitizer) {
    this.messages$ = this.messagesSvc.messages$;
    this.message$=this.messagesSvc.currentMessage$;
    this.phone$ = this.phoneSvc.phone$;
  }

  @ViewChild('smsLinkRef', {static: true}) smsLinkRef!: ElementRef;

  async onSend(message: ISendMessage): Promise<void> {
    let theMessage = await this.setSMSString(message);
    this.smsLink = theMessage;
  }

  onSelected(id: string): void {
    this.messagesSvc.setCurrent(id);
  }

  private async setSMSString({text}: Pick<Message, 'text'>): Promise<SafeResourceUrl> {
    const phone = await firstValueFrom(this.phone$.pipe(take(1)));
    return this.sanitizer.bypassSecurityTrustResourceUrl(`sms://${phone}?body=${text}`);
  }

}
