import {Component, Output} from '@angular/core';
import {UserService} from "../../service/user.service";
import {SidebarService} from "../../service/sidebar.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private title: string = 'Aprobación Documentos';
  public showSidebar: boolean = false;

  constructor(
    public userService: UserService,
    public sidebarService: SidebarService
  ) {

  }

  logout() {}

  showAndHideSidebar() {
    this.sidebarService.visibility.subscribe(value => {
        this.showSidebar = value;
    });
    this.showSidebar ? this.sidebarService.hide() : this.sidebarService.show();
  }

}
