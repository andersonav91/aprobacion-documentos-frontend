import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { SidebarService } from "../../service/sidebar.service";
import { AuthService } from "../../service/auth.service";
import { MenuModel } from "../../model/menu";
import { Router } from "@angular/router";
import { NoticeService } from "../../service/notice.service";
import { LoadingService } from "../../service/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private title: string = 'Aprobación Documentos';
  public showSidebar: boolean = false;
  @ViewChild('content', {static: true}) content: ElementRef;

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
      name: 'status',
      title: 'Estados',
      icon: 'swap_horiz',
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
    private router: Router,
    private noticeService: NoticeService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.noticeService.message.subscribe((obj: any) => {
      if(! obj.init) {
        if(obj.active) {
          this.content.nativeElement.style.height = (this.content.nativeElement.offsetHeight - 92) + 'px';
        } else {
          this.content.nativeElement.style.height = (this.content.nativeElement.offsetHeight + 32) + 'px';
        }
      }
    });
  }

  logout() {
    this.authService.logout();
    this.loadingService.show();
    window.location.reload();
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
    };
  }

}
