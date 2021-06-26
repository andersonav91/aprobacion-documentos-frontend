import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SidebarService } from "../../service/sidebar.service";
import { AuthService } from "../../service/auth.service";
import { MenuModel } from "../../model/menu";
import { Router } from "@angular/router";
import { UserModel } from "../../model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('content', {static: true}) content: ElementRef;

  public showSidebar: boolean = false;
  public currentUser: UserModel;

  public menuItems: MenuModel[] = [
    {
      name: 'profile',
      title: 'Perfil',
      icon: 'account_circle',
      separator: true,
      roles: ['all']
    },
    {
      name: 'document',
      title: 'Gestión Documentos',
      icon: 'fact_check',
      separator: true,
      roles: ['all']
    },
    {
      name: 'document_type',
      title: 'Tipo Documentos',
      icon: 'analytics',
      separator: true,
      roles: ['admin']
    },
    {
      name: 'user',
      title: 'Usuarios',
      icon: 'person',
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
      name: 'flow',
      title: 'Flujos',
      icon: 'low_priority',
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
    private router: Router
  ) {
    this.authService.currentUser.subscribe((user: UserModel) => {
      this.currentUser = user;
    });
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
      case 'user':
        this.router.navigate(['/user']);
        break;
      case 'document':
        this.router.navigate(['/document']);
        break;
      case 'home':
        this.router.navigate(['']);
        break;
      case 'flow':
        this.router.navigate(['/flow']);
        break;
      case 'profile':
        this.router.navigate(['/user/' + this.currentUser.id + '/edit']);
        break;
    }
  }

}
