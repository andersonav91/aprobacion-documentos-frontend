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

  show(content: string, type: string) {
    this.message.next({content: content, type: type, active: true});
    const source = timer(5000);
    const clock = source.subscribe(val => {
      this.hide();
    });
  }

  hide() {
    this.message.next({content: '', type: '', active: false});
  }
}
