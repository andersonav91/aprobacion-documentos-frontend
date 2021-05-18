import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  public message: BehaviorSubject<any>;

  constructor() {
    this.message = new BehaviorSubject({content: '', type: '', active: false});
  }

  /**
   * Shows a message with and specific kind, then the message is hide after 5 seconds.
   */
  show(content: string, type: string) {
    this.message.next({content: content, type: type, active: true});
    const source = timer(5000);
    const clock = source.subscribe(val => {
      this.hide();
    });
  }

  /**
   * Hide a message.
   */
  hide() {
    this.message.next({content: '', type: '', active: false});
  }
}
