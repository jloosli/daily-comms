import {Timestamp} from '@angular/fire/firestore';

export interface Message {
  id?: string;
  text: string;
  count: number;
  last_sent: Date | null;
}

export interface MessageFS {
  text: string;
  count: number;
  last_sent: Timestamp | null
}
