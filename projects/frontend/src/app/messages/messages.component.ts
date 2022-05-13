import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
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

  constructor(private messagesSvc: MessagesService, private phoneSvc: PhoneService, private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {
    this.messages$ = this.messagesSvc.messages$;
    this.message$ = this.messagesSvc.currentMessage$;
    this.phone$ = this.phoneSvc.phone$;
  }

  @ViewChild('smsLinkRef', {static: true}) smsLinkRef!: ElementRef;

  async onSend(message: ISendMessage): Promise<void> {
    this.smsLink = await this.setSMSString(message);
    this.cdr.detectChanges();
    if (message.add) {
      await this.messagesSvc.addMessage(message.text);
    }
    if (message.update) {
      await this.messagesSvc.updateMessage(message.id!, {text: message.text});
    }
  }

  onSelected(id: string): void {
    this.messagesSvc.setCurrent(id);
  }

  private async setSMSString({text}: Pick<Message, 'text'>): Promise<SafeResourceUrl> {
    const phone = await firstValueFrom(this.phone$.pipe(take(1)));
    return this.sanitizer.bypassSecurityTrustResourceUrl(`sms://${phone}?body=${text}`);
  }

}
