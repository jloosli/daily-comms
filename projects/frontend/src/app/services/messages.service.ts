import {Injectable} from '@angular/core';
import {Message, MessageFS} from 'projects/frontend/src/app/interfaces/message';
import {BehaviorSubject, combineLatest, map, Observable} from 'rxjs';
import {
  collection,
  collectionData,
  Firestore,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions, addDoc, updateDoc, doc, deleteDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private collRef = collection(this.fs, 'messages');
  private currentId$ = new BehaviorSubject<string | null>(null);
  currentMessage$: Observable<Message | null>;
  messages$: Observable<Message[]>;

  constructor(private fs: Firestore) {
    const messagesCollection = collection(fs, 'messages').withConverter(messageConverter);
    this.messages$ = collectionData(messagesCollection, {idField: 'id'});
    this.currentMessage$ = combineLatest([this.messages$, this.currentId$]).pipe(
      map(([messages, currentId]) => messages ? messages.find(message => message?.id === currentId) ?? null : null),
    );
  }

  addMessage(message: Message) {
    return addDoc(this.collRef, message);
  }

  updateMessage(id: string, message: Partial<Message>) {
    const docRef = doc(this.collRef, id);
    return updateDoc(docRef, message);
  }

  deleteMessage(id: string) {
    const docRef = doc(this.collRef, id);
    return deleteDoc(docRef);
  }

  setCurrent(id?: string | null) {
    this.currentId$.next(id ?? null);
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
