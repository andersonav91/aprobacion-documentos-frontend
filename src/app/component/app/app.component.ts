import { Component } from '@angular/core';
import { SidebarService } from "../../service/sidebar.service";
import { AuthService } from "../../service/auth.service";
import { MenuModel } from "../../model/menu";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private title: string = 'Aprobación Documentos';
  public showSidebar: boolean = false;

  menuItems: MenuModel[] = [
    {
      name: 'home',
      title: 'Inicio',
      icon: 'home',
      separator: false
    },
    {
      name: 'profile',
      title: 'Perfil',
      icon: 'account_circle',
      separator: true
    },
    {
      name: 'document_type',
      title: 'Tipo Documentos',
      icon: 'contact_page',
      separator: true,
    },
    {
      name: 'logout',
      title: 'Salir',
      icon: 'logout',
      separator: false,
    }
  ];

  constructor(
    public authService: AuthService,
    public sidebarService: SidebarService,
    private router: Router
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

  invokeMenu(menu: MenuModel) {
    switch (menu.name.toLowerCase()) {
      case 'logout':
        this.logout();
        break;
      case 'document_type':
        this.router.navigate(['/document-type']);
        break;
      case 'home':
        this.router.navigate(['']);
        break;
    };
  }

}
