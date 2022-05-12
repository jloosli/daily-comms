import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from 'projects/frontend/src/app/interfaces/message';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  @Input() messages: Message[] | null = [];
  @Input() phone: string | null = '';
  @Output() selectMessage = new EventEmitter<string>();
  @Output() deleteMessage = new EventEmitter<string>();

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }



  onSelect({id}: Message): void {
    console.log(id);
    this.selectMessage.emit(id);
  }


}
