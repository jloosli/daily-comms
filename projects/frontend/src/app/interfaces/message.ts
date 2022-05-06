import {Timestamp} from '@angular/fire/firestore';

export interface Message {
  id?: string;
  text: string;
  count: number;
  last_sent: Date;
}

export interface MessageFS {
  text: string;
  count: number;
  last_sent: Timestamp
}
