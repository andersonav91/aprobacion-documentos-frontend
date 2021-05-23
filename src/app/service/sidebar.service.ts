import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public visibility: BehaviorSubject<any>;

  constructor() {
    this.visibility = new BehaviorSubject(false);
  }

  /**
   * Shows the sidebar.
   */
  show() {
    this.visibility.next(true);
  }

  /**
   * Hides the sidebar.
   */
  hide() {
    this.visibility.next(false);
  }

}
