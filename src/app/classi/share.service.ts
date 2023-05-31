import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private message = new BehaviorSubject('');
  sharedMessage = this.message.asObservable();

  constructor() { }

  nextMessage(message: string): void {
    this.message.next(message);
  }
}

