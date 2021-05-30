import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SidebarService } from "../../service/sidebar.service";
import { AuthService } from "../../service/auth.service";
import { MenuModel } from "../../model/menu";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public showSidebar: boolean = false;
  @ViewChild('content', {static: true}) content: ElementRef;

  menuItems: MenuModel[] = [
    {
      name: 'home',
      title: 'Inicio',
      icon: 'home',
      separator: false,
      roles: ['all']
    },
    {
      name: 'profile',
      title: 'Perfil',
      icon: 'account_circle',
      separator: true,
      roles: ['all']
    },
    {
      name: 'document_type',
      title: 'Tipo Documentos',
      icon: 'contact_page',
      separator: true,
      roles: ['admin']
    },
    {
      name: 'status',
      title: 'Estados',
      icon: 'swap_horiz',
      separator: true,
      roles: ['admin']
    },
    {
      name: 'logout',
      title: 'Salir',
      icon: 'logout',
      separator: false,
      roles: ['all']
    }
  ];

  constructor(
    public authService: AuthService,
    public sidebarService: SidebarService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
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
      case 'status':
        this.router.navigate(['/status']);
        break;
      case 'home':
        this.router.navigate(['']);
        break;
    }
  }

}
