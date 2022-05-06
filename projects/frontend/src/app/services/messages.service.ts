import {Injectable} from '@angular/core';
import {Message, MessageFS} from 'projects/frontend/src/app/interfaces/message';
import {Observable} from 'rxjs';
import {
  collection,
  collectionData,
  Firestore,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages$: Observable<Message[]>;

  constructor(private fs: Firestore) {
    const messagesCollection = collection(fs, 'messages').withConverter(messageConverter);
    this.messages$ = collectionData(messagesCollection, {idField: 'id'});
  }


}

const messageConverter = {
  toFirestore: (message: Message): DocumentData => {
    return {text: message.text, count: message.count, last_sent: message.last_sent};
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Message => {
    const {count = 0, last_sent, text} = snapshot.data(options);
    return {text: text, count: count, last_sent: last_sent?.toDate()};
  },
};
