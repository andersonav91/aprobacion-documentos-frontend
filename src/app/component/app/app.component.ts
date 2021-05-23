import { Component } from '@angular/core';
import { SidebarService } from "../../service/sidebar.service";
import { AuthService } from "../../service/auth.service";
import { Menu } from "../../model/menu";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private title: string = 'Aprobación Documentos';
  public showSidebar: boolean = false;

  menuItems: Menu[] = [
    {
      name: 'Inicio',
      icon: 'home',
      separator: false
    },
    {
      name: 'Perfil',
      icon: 'account_circle',
      separator: true
    },
    {
      name: 'Salir',
      icon: 'logout',
      separator: false
    }
  ];

  constructor(
    public authService: AuthService,
    public sidebarService: SidebarService
  ) {
  }

  logout() {
    this.authService.logout();
  }

  showAndHideSidebar() {
    this.sidebarService.visibility.subscribe(value => {
        this.showSidebar = value;
    });
    this.showSidebar ? this.sidebarService.hide() : this.sidebarService.show();
  }

}
