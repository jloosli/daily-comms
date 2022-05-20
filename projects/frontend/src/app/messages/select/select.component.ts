import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from 'projects/frontend/src/app/interfaces/message';
import {UntypedFormBuilder} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {

  messageForm = this.fb.group({
    text: [''],
    action: [null],
  });

  @Input() set message(message: Message | null) {
    if (message) {
      this.messageForm.get('text')?.patchValue(message.text);
    }
  };

  @Input() phone: string | null = '';
  @Output() send = new EventEmitter<ISendMessage>();

  constructor(private fb: UntypedFormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.send.emit({
      text: this.messageForm.get('text')?.value,
      id: this.message?.id,
      add: this.messageForm.get('action')?.value === 'add',
      update: this.messageForm.get('action')?.value === 'update',
    });
  }
}

export interface ISendMessage {
  text: string;
  id: string | undefined;
  add: boolean;
  update: boolean;
}
