import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public count: BehaviorSubject<number>;
  public i: number;

  constructor() {
    this.i = 0;
    this.count = new BehaviorSubject(0);
  }

  /**
   * Shows the loading indicator.
   */
  show() {
    this.i = this.i + 1;
    this.count.next(this.i);
  }

  /**
   * Hides the loading indicator.
   */
  hide() {
    this.i = this.i - 1;
    this.count.next(this.i);
  }
}
