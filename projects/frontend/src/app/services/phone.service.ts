import {Inject, Injectable, Optional} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhoneService {

  private window: Window | null = null;

  phone$ = new BehaviorSubject<string>('');

  constructor(@Optional() @Inject(DOCUMENT) private document: Document) {
    this.window = document?.defaultView;
    this.phone$.next(this.getPhone());
  }

  private getPhone(): string {
    return this.window?.localStorage.getItem('phone') || '';
  }

  setPhone(number: string) {
    this.window?.localStorage.setItem('phone', number);
    this.phone$.next(number);
  }
}
