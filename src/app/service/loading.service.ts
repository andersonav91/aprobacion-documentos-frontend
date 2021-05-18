import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public visibility: BehaviorSubject<any>;

  constructor() {
    this.visibility = new BehaviorSubject(false);
  }

  /**
   * Shows the loading indicator.
   */
  show() {
    this.visibility.next(true);
  }

  /**
   * Hides the loading indicator.
   */
  hide() {
    this.visibility.next(false);
  }
}
